import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';
import LinearProgress from '@mui/material/LinearProgress';

import Header from '../src/components/header';
import SignUpForm from '../src/components/auth/signUpForm';
import useRedirect from '../src/hooks/useRedirect';

const SignUp: NextPage = () => {
	const [session, loading] = useSession();
	const redirect = useRedirect();
	const { isReady } = redirect;

	/* Handle for google sign in and already sign in */
	useEffect(() => {
		(async () => {
			if (!loading && session && isReady) {
				await redirect.doRedirect('/class');
			}
		})();
	}, [session, loading, isReady]);

	return loading ? (
		<LinearProgress color='secondary' />
	) : (
		<React.Fragment>
			<Head>
				<title>Fit Class -Đăng Ký</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header title='Đăng ký' icon={<LockOpenRounded />} />
			<SignUpForm />
		</React.Fragment>
	);
};

export default SignUp;