import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div>
      <h2>Please Sign In</h2>
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}

export default SignInPage;
