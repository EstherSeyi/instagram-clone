import styled from "styled-components";

import loader from "../../images/loader.png";

const Box = styled.div.attrs({})`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = () => {
  return (
    <Box>
      <img src={loader} alt="Loader" className="h-100 w-100" />
    </Box>
  );
};

export default Loading;
