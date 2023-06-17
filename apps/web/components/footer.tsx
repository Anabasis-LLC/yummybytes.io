export const Footer = () => {
  return (
    <div className="grow bg-footer py-10">
      <div className="container">
        <div className="text-sm font-semibold">
          <span className="text-foreground/50 mr-1">
            ©{new Date().getFullYear()}
          </span>{' '}
          Anabasis Labs 🧪
        </div>
      </div>
    </div>
  );
};
