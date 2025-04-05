import { concat, match, search } from "./sample";
describe ("concat", () => {
    test("Concatenates two non-empty strings", () => {
        expect(concat("Hello, ", "world!")).toBe("Hello, world!");
      });
      
      test("Concatenates a string with an empty string", () => {
        expect(concat("Hello", "")).toBe("Hello");
      });
      
      test("Concatenates two empty strings", () => {
        expect(concat("", "")).toBe("");
      });
      
      test("Concatenates strings with special characters", () => {
        expect(concat("Hello", "😊")).toBe("Hello😊");
      });
      
      test("Concatenates strings with spaces", () => {
        expect(concat("Hello", " world")).toBe("Hello world");
      });
}),
describe("match", () => {
    test("Finds a single match in a string", () => {
        const result = match("abc123", /\d+/);
        expect(result).not.toBeNull();
        expect(result[0]).toBe("123");
    });

    test("Finds multiple matches in a string", () => {
        expect(match("abc123def456", /\d+/g)).toEqual(["123", "456"]);
    });

    test("Returns null when no match is found", () => {
        expect(match("abcdef", /\d+/)).toBeNull();
    });

    test("Finds a match at the start of a string", () => {
        const result = match("123abc", /^\d+/);
        expect(result).not.toBeNull();
        expect(result[0]).toBe("123");
    });

    test("Finds a match with case-insensitive flag", () => {
        const result = match("Hello", /hello/i);
        expect(result).not.toBeNull();
        expect(result[0]).toBe("Hello");
    });
}),
describe("search", () => {
    test("Finds the position of the first match", () => {
        expect(search("abc123", /\d/)).toBe(3);
    });

    test("Returns -1 when no match is found", () => {
        expect(search("abcdef", /\d/)).toBe(-1);
    });

    test("Finds the first occurrence among multiple matches", () => {
        expect(search("abc123def456", /\d/)).toBe(3);
    });

    test("Finds a match at the beginning of a string", () => {
        expect(search("123abc", /^\d/)).toBe(0);
    });

    test("Finds a match with case-insensitive flag", () => {
        expect(search("Hello", /h/i)).toBe(0);
    });
});
