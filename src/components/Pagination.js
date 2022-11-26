import styled from "styled-components";

function Pagination ({ total, limit, page, setPage}) {
  /* competitionMatch.js에서 보내준 API 데이터의 길이 / liit은 한 화면에 보여주는 팀 개수 */
    const numPages = Math.ceil(total / limit); 
    
    return(
        <>
            <Nav>
                <Button onClick={() => setPage(page -1)} disabled={page ===1}>
                    &lt;
                </Button>
                {Array(numPages)
                .fill()
                .map((_, i) => (
                    <Button
                        key={i +1}
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? "page" : null}
                    >
                        {i + 1}
                    </Button>
                ))}
                <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    &gt;
                </Button>
            </Nav>
        </>
    );
}

export default Pagination;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
