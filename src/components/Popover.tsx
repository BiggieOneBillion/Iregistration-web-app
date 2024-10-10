import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { RiMore2Line } from "react-icons/ri";

const Popover = () => {
  return (
    <Menu>
      <MenuButton>
        <span className="inline-block p-1 border rounded-md">
          <RiMore2Line />
        </span>
      </MenuButton>
      <MenuList  padding={'0'} minWidth={'fit'} backgroundColor={'black'}>
        <Button size={"sm"} variant="authSolid">
          Log Out
        </Button>
      </MenuList>
    </Menu>
  );
};

export default Popover;
