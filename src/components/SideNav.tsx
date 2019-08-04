import React, { useContext } from "react";
import styled from "styled-components";
import { PRIMARY } from "../lib/colors";
import FileContext from "../lib/FileContext";
import formatByFilepath from "../lib/prettier/formatByFilepath";

const Container = styled.div`
  background-color: ${PRIMARY};
  display: flex;
  flex-flow: column;
`;
const EmojiButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 50px;
  margin: 10px;
  &:hover {
    background-color: rgba(1, 1, 1, 0.1);
  }
`;

const SideNav: React.FC = () => {
  const { filepath, resetFilepath } = useContext(FileContext);

  return (
    <Container>
      <EmojiButton
        onClick={() => {
          resetFilepath();
        }}
      >
        🐘
      </EmojiButton>
      <EmojiButton onClick={() => {
        if (typeof filepath === "string") {
         formatByFilepath(filepath);
        }
      }}>
        ✨
      </EmojiButton>
    </Container>
  );
};

export default SideNav;
