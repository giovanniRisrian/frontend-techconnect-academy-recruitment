import { styled } from '@mui/system';
import background from '../../asset/image/background.jpg'

const MyComponent = styled('div')({
    backgroundImage: `url(${background})`,
    backgroundSize:"cover",
    minHeight:"85vh",
  });

export default MyComponent;