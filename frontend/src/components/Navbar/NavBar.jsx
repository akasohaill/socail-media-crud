import { SignedIn, UserButton} from '@clerk/clerk-react';
import './NavBar.css'

function NavBar() {
  return (
    <nav>
<div className="logo">
  <h1>Logo.</h1>
</div>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </nav>
  );
}

export default NavBar;
