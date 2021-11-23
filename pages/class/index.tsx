import React, { memo } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Button from '@mui/material/IconButton';
import { getSession } from 'next-auth/client';

import ClassIcon from '@mui/icons-material/Class';
import PlusIcon from '@mui/icons-material/Add';

import Classes from '../../src/components/classes';
import Header from '../../src/components/header';
import AddClassModal from '../../src/components/addClassModal';
import useToggle from '../../src/hooks/useToggle';
import ClassProvider from '../../src/store/class';
import { GetAllClasses } from '../../src/api/server';

import { IClass } from '../../src/type';

interface ClassesPageProps {
	classes: IClass[];
}

const addClassModalWithButton = () => {
	const { isOpen, handleOpen, handleClose } = useToggle();

	return (
		<React.Fragment>
			<Button onClick={handleOpen} aria-label='Add Class'>
				<PlusIcon />
			</Button>
			<AddClassModal open={isOpen} handleClose={handleClose} />
		</React.Fragment>
	);
};

const AddClassModalWithButton = memo(addClassModalWithButton);

const Home: NextPage<ClassesPageProps> = ({ classes }: ClassesPageProps) => {
	return (
		<ClassProvider initClasses={classes}>
			<Head>
				<title>Fit Class - Lớp học</title>
				<meta name='description' content='Danh sách lớp học' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header title='Fit class' icon={<ClassIcon />} rightAction={<AddClassModalWithButton />} isAuth />
			<Classes />
		</ClassProvider>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (session) {
		const classes: IClass[] = await GetAllClasses(session?.accessToken as string);

		return {
			props: {
				classes
			}
		};
	}

	return {
		redirect: {
			destination: '/signin',
			statusCode: 302
		}
	};
};

export default Home;