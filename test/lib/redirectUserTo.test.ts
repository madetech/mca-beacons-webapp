import { redirectUserTo } from "../../src/lib/redirectUserTo";

describe("redirectUserTo()", () => {
  it("should return a redirect to the provided url", () => {
    const result = redirectUserTo("/arbitrary-url");

    expect(result).toStrictEqual({
      redirect: {
        destination: "/arbitrary-url",
        permanent: false,
      },
    });
  });
});
