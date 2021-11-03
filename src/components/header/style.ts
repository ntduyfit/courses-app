import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const Container = styled(AppBar)`
	padding: 0.5em 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: #f4f6f6;
	color: #3e4b4b;

	@media only screen and (max-width: 900px) {
		padding: 0;
	}
`;

export const Section = styled(Box)`
	display: flex;
	align-items: center;
	margin: 0 1rem;
	& > * {
		margin: 0 0.5rem;
	}

	& h5 {
		font-weight: bold;
	}
`;

export const Separator = styled('div')`
	flex-grow: 1;
`;

export const CircleButton = styled(Button)`
	box-sizing: border-box;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	padding: 0;
`;
