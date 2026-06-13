export function isFirebaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

export const firebaseStatus = isFirebaseConfigured()
  ? "Firebase será conectado quando você tiver as credenciais."
  : "Firebase ainda não configurado. Nesta fase usamos dados mockados e a integração fica para o final.";
