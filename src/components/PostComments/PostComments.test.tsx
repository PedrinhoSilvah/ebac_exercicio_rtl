import { fireEvent, render, screen } from "@testing-library/react";
import Post from ".";
import PostComment from ".";

describe("Teste para o componente PostComment", () => {
  it("Deve renderizar o componente corretamente", () => {
    render(<PostComment />);
    expect(screen.getByText("Comentar")).toBeInTheDocument();
  });

  it("Deve permitir a adição de dois comentários", () => {
    render(<PostComment />);

    const input = screen.getByTestId("comment-input");
    const button = screen.getByTestId("comment-button");
    const list = screen.getByTestId("comments-list");

    fireEvent.change(input, { target: { value: "Primeiro comentário" } });
    fireEvent.click(button);

    expect(list).toHaveTextContent("Primeiro comentário");

    fireEvent.change(input, { target: { value: "Segundo comentário" } });
    fireEvent.click(button);

    const comments = screen.getAllByTestId("comment-item");
    expect(comments).toHaveLength(2);
    expect(comments[0]).toHaveTextContent("Primeiro comentário");
    expect(comments[1]).toHaveTextContent("Segundo comentário");
  });
});
