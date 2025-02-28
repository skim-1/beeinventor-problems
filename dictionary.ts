/**
* @description The dictionary implementation will be given a list of string.
* And you will need to write a funciton to find out if the user input is inside the dictionary.
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


class SimpleDictionary implements IDictionary {
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

  isInDict(pattern: string): boolean {
    let node = this.root;

    for (const char of pattern) {
      if (!node.children.has(char)) {
        return false;
      } else {
        node = node.children.get(char)!;
      }
    }
    return node.isEndOfWord;
  }
}


const dict = new SimpleDictionary();


dict.setup(['cat', 'car', 'bar']);
console.log(dict.isInDict('cat'));
console.log(dict.isInDict('bat'));