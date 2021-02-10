import { StarFabButton } from "components/starButton/layout";
import React, { useState } from "react";

const StarButton = (props: { id: string; active: boolean }) => {
  const [active, setActive] = useState(props.active);
  const onClick = () => setActive((active) => !active);

  return <StarFabButton size="small" active={active} onClick={onClick} />;
};

export default StarButton;
