export const useAuth = () => useState<{ userId: string; email: string } | null | undefined>('auth', () => null);
