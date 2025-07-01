import { jwtDecode } from "jwt-decode";
import { Usuario } from '@/models/Usuario';

interface PayloadJWT {
  sub: string;
  nome: string;
  perfil: 'admin' | 'comum';
  exp: number;
}

const secret = 'batman';

export async function login(email: string, senha: string): Promise<boolean> {
  if (email === 'admin@demo.com' && senha === '123') {
    const user = new Usuario('Admin', email, 'admin');
    const token = await gerarJWT(user, secret);
    sessionStorage.setItem('token', token);
    return true;
  }

  if (email === 'user@demo.com' && senha === '123') {
    const user = new Usuario('Usuário', email, 'comum');
    const token = await gerarJWT(user, secret);
    sessionStorage.setItem('token', token);
    return true;
  }

  return false;
}

export function logout() {
  sessionStorage.removeItem('token');
}

export function isLoggedIn(): boolean {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = jwtDecode<PayloadJWT>(token);
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export async function isLoggedInAsync(): Promise<boolean> {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  try {
    const assinaturaOk = await verificarAssinaturaJWT(token, secret);
    if (!assinaturaOk) return false;

    const payload = jwtDecode<PayloadJWT>(token);
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}


export function getUsuarioLogado(): Usuario | null {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  try {
    const payload: PayloadJWT = jwtDecode(token);
    return new Usuario(payload.nome, payload.sub, payload.perfil);
  } catch {
    return null;
  }
}

// Função para gerar JWT com assinatura real simulada (HMAC SHA-256)
async function gerarJWT(user: Usuario, secret: string): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    sub: user.email,
    nome: user.nome,
    perfil: user.perfil,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 1 dia
  };

  const encoder = new TextEncoder();

  const base64UrlEncode = (obj: object) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const headerEncoded = base64UrlEncode(header);
  const payloadEncoded = base64UrlEncode(payload);
  const data = `${headerEncoded}.${payloadEncoded}`;

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${data}.${signatureBase64}`;
}

export async function verificarAssinaturaJWT(token: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();

  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) return false;

  const data = `${header}.${payload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const novaAssinaturaBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const novaAssinatura = btoa(String.fromCharCode(...new Uint8Array(novaAssinaturaBuffer)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return novaAssinatura === signature;
}
