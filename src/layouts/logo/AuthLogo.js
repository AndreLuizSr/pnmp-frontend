
import LogoImage from '../../assets/images/logos/logo.png';

const AuthLogo = () => {
  return (
    <div className="p-4 d-flex justify-content-center align-items-center gap-2">
      <img src={LogoImage} alt="Logo" />
    </div>
  );
};

export default AuthLogo;
