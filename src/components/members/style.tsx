import React from 'react';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export const StyledContainer = styled(Container)`
	margin-top: 80px;
	display: flex;
	flex-direction: column;
`;

export const ClassesHeader = styled.div`
	font-size: 18px;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 1rem;
`;

export const ClassesListContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const ClassesList = styled(({ children }) => (
	<Grid component='ol' container spacing={2}>
		{children}
	</Grid>
))`
	display: flex;
	flex-wrap: wrap;
	align-self: center;
	justify-content: flex-start;
`;
