import { Usuario } from "@/models/Usuario";

export function login(email: string, senha: string): boolean {
  if (email === "admin@demo.com" && senha === "123") {
    const user = new Usuario("Admin", email, "admin");
    sessionStorage.setItem("user", user.toJSONstr());
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem("user");
}

export function getUsuarioLogado(): Usuario | null {
  const data = sessionStorage.getItem("user");
  return data ? Usuario.fromJSON(data) : null;
}

export function isLoggedIn(): boolean {
  return !!sessionStorage.getItem("user");
}
