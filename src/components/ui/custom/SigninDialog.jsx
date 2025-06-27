import React, { useContext } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../button'
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailContext } from '@/context/UserDetailContext';
import axios from 'axios';
function SigninDialog({openDialog,closeDialog}) {
  const {userDetails, setUserDetails} = useContext(UserDetailContext);


const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: 'Bearer'+tokenResponse.access_token } },
    );

    console.log(userInfo);
    setUserDetails(userInfo?.data);
    closeDialog(false);
  },
  onError: errorResponse => console.log(errorResponse),
});

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>

  <DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription >
        <div className="flex flex-col items-center justify-center gap-2">
        <h2 className='font-bold text-xl text-center text-blue-600'>{Lookup.SIGNIN_HEADING}</h2>
        <p className='mt-2 text-center text-lg'>{Lookup.SIGNIN_SUBHEADING}</p>
        <Button className='text-white mt-3 flex items-center 
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800' onClick={googleLogin}>SignIn with Google</Button>
        <p>
          {Lookup.SIGNIn_AGREEMENT_TEXT}
        </p>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default SigninDialog
