import React, { useState, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CollapseIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandedIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons/faChalkboardTeacher';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';

import { AppState } from '../../reducers';
import { CommonContext } from '../../store/common';
import SubListClass from './subListClass';
import ClassRoutes from './classRoutes';
import useWindowWidth from '../../hooks/useWindowWidth';
import FontAwesomeSvgIcon from '../UI/fontAweosomeIcon';
import { StyledDrawer, DrawerHeader, HomePage } from './style';
import { ROLES } from '../../constants';
import useRequest from '../../hooks/useRequest';
import { IClass } from '../../type';

interface NavigationProps {
  detail?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ detail }) => {
  const { isNavOpen, openNav, closeNav } = useContext(CommonContext);
  const { info: currentClass } = useSelector((state: AppState) => state.currentClass);
  const { data: classes } = useRequest<IClass[]>({ url: '/classes' });

  const [expanded, setExpanded] = useState(false);
  const [isOpenTeachClass, setIsOpenTeachClass] = useState(false);
  const [isOpenStudyClass, setIsOpenStudyClass] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const windowWidth = useWindowWidth();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowWidth < 650) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);

  const handleCloseDrawer = () => {
    closeNav();
    setIsOpenTeachClass(false);
    setIsOpenStudyClass(false);
  };

  const handleCloseDrawerByLeaveMouse = () => {
    if (!isMobile && !expanded) {
      closeNav();
      setIsOpenTeachClass(false);
      setIsOpenStudyClass(false);
    }
  };

  const handleOpenDrawer = () => {
    openNav();
  };

  return (
    <React.Fragment>
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isNavOpen}
        onMouseEnter={handleOpenDrawer}
        onMouseLeave={handleCloseDrawerByLeaveMouse}
        onClose={handleCloseDrawer}
        $expanded={expanded}
        ref={drawerRef}
      >
        <DrawerHeader>
          <Link href='/class' passHref>
            <HomePage fontSize='large'>
              <FontAwesomeSvgIcon icon={faHome} size='large' />
            </HomePage>
          </Link>
          {isMobile ? (
            <IconButton size='large' onClick={handleCloseDrawer} aria-label='close nav'>
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton size='large' onClick={() => setExpanded(!expanded)} aria-label='expand nav'>
              {expanded ? <CollapseIcon /> : <ExpandedIcon />}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        {detail && (currentClass.role === ROLES.owner || currentClass.role === ROLES.teacher) && (
          <ClassRoutes classCode={currentClass.code} />
        )}
        <List component='div'>
          <ListItemButton onClick={() => setIsOpenTeachClass(!isOpenTeachClass)}>
            <ListItemIcon>
              <FontAwesomeSvgIcon icon={faChalkboardTeacher} size='large' />
            </ListItemIcon>
            <ListItemText primary='Giảng dạy' />
            {isOpenTeachClass ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <SubListClass isOpen={isOpenTeachClass} list={classes as IClass[]} type='teacher' />
        </List>
        <Divider />
        <List component='div'>
          <ListItemButton onClick={() => setIsOpenStudyClass(!isOpenStudyClass)}>
            <ListItemIcon>
              <FontAwesomeSvgIcon icon={faGraduationCap} size='large' />
            </ListItemIcon>
            <ListItemText primary='Đã đăng ký' />
            {isOpenStudyClass ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <SubListClass isOpen={isOpenStudyClass} list={classes as IClass[]} type='student' />
        </List>
      </StyledDrawer>
    </React.Fragment>
  );
};

Navigation.defaultProps = {
  detail: false
};

export default Navigation;
