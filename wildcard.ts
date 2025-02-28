/**
* @description The wildcard dictionary implementation will be given a list of string.
* And you will need to write a funciton to find out if the user input is inside the dictionary.
* This implementation is an extended feature for question `Simple Dictionary`

*
* input: 'cat', 'car', 'bar'
*
* function setup(input: string[])
* function isInDict(word: string)
*
* dict.setup(['cat', 'car', 'bar'])
* dict.isInDict('cat') // true
* dict.isInDict('bat') // false
*
* WildCard
* dict.isInDict('*at') // true
* dict.isInDict('cr*') // false
*
*/

interface ITrieNode {
  children: Map<string, ITrieNode>;
  isEndOfWord: boolean;
}

interface IDictionary {
  setup(words: string[]): void;
  isInDict(pattern: string): boolean;
}


class TrieNode implements ITrieNode {
  children: Map<string, ITrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}


class WildcardDictionary implements IDictionary {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  setup(words: string[]): void {
    for (const word of words) {
      let node = this.root;
      for (const char of word) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char)!;
      }
      node.isEndOfWord = true;
    }
  }

  search(node: TrieNode, pattern: string, index: number): boolean {
    if (index === pattern.length) {
      return node.isEndOfWord;
    }

    const char = pattern[index];

    if (char === '*') {
      for (const child of node.children.values()) {
        return this.search(child, pattern, index + 1);
      }
      return false;
    } else if (node.children.has(char)) {
      return this.search(node.children.get(char)!, pattern, index + 1);
    }

    return false;
  }

  isInDict(pattern: string): boolean {
    return this.search(this.root, pattern, 0);
  }
}


const dict = new WildcardDictionary();
dict.setup(['cat', 'car', 'bar']);
console.log(dict.isInDict('*at'));
console.log(dict.isInDict('cr*'));