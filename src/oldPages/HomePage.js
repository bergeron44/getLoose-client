import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router'
import { useDispatch } from 'react-redux';
import { setAllCategoryName } from '../store/actions/categories';

const h=window.innerHeight
const images = [
  {
    url: 'https://previews.123rf.com/images/maxiporik/maxiporik1509/maxiporik150900059/44509174-men-fans-screaming-and-watching-football-on-tv-and-drink-beer-three-other-men-drinking-beer-and-havi.jpg',
    title: 'start a game',
    width: '30%',
    link:'/enterUserName'
  },
  {
    url: 'https://image.shutterstock.com/image-illustration/examine-study-instructions-showed-magnify-260nw-1888576435.jpg',
    title: 'instructions',
    width: '30%',
    link: '/gameInstructins',

  },
  {
    url: 'https://media.istockphoto.com/photos/hand-inserting-suggestion-into-suggestion-box-picture-id496792842',
    title: 'suggestions',
    width: '30%',
    link: "/gameSuggestion",
  },
  {
    url: 'https://assets.entrepreneur.com/content/3x2/2000/20180128135931-shutterstock-466715522.jpeg?auto=webp&quality=95&crop=16:9&width=675',
    title: 'admin add Question',
    width: '30%',
    link: "/gameAddQuestion",
  },
  {
    url: 'https://th.bing.com/th/id/R.35a16aa6743a594d9a13883d71ad32cd?rik=r65LNwx8FIpelw&riu=http%3a%2f%2fwww.sagaflor.de%2ffileadmin%2f_processed_%2fcsm_final_Category_Management_Website_shutterstock_290636426_86304a41f0.jpg&ehk=OM3ysZk1v0t%2bSp8H8tCyKRa2V%2fxuu3iixtWMXPZFHds%3d&risl=&pid=ImgRaw&r=0',
    title: 'admin add Category',
    width: '30%',
    link: "/gameAddCategory",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBases() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
            height:h/images.length
          }}
          onClick={() =>{
            dispatch(setAllCategoryName())
             navigate(image.link)
             }
            }
          // href={image.link}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}
