import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to={"https://www.chaicode.com"} target="_blank">
      <img
        className="absolute right-10 bottom-10"
        src="/logo.png"
        alt="Chai aur Code Logo"
        height={100}
        width={100}
      />
    </Link>
  );
}

export default Logo;
