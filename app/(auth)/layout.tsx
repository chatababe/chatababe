const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen py-[4rem] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
