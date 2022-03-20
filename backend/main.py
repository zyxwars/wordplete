import matplotlib.pyplot as plt

bigrams = {}
trigrams = {}

with open('./backend/words.txt', encoding='utf-8') as word_list:
    with open('./src/words.js', 'w', encoding='utf-8') as js_word_list:
        js_word_list.write('export const words = [\n')
        for word in word_list:
            word = word.rstrip('\n')
            word = word.lower()
            js_word_list.write(f'"{word}",\n')

            length = len(word)
            for i, letter in enumerate(word):
                if i + 1 == length:
                    break

                if "'" in (letter, word[i + 1]):
                    continue

                bigram_frequency = bigrams.get(letter+word[i+1], 0)
                bigrams[letter+word[i+1]] = bigram_frequency + 1

                if i + 2 == length:
                    break

                if "'" in (letter, word[i + 1], word[i + 2]):
                    continue

                trigram_frequency = trigrams.get(letter+word[i+1]+word[i+2], 0)
                trigrams[letter+word[i+1]+word[i+2]] = trigram_frequency + 1
        js_word_list.write('];')


trigrams = sorted(trigrams.items(), key=lambda i: i[1])
bigrams = sorted(bigrams.items(), key=lambda i: i[1])

with open('./src/words.js', 'a', encoding='utf-8') as f:
    f.write('\nexport const bigrams = [\n')

    length = len(bigrams)
    for i, bigram in enumerate(bigrams):
        f.write(f'["{bigram[0]}", {bigram[1]}],\n')

    f.write('];\n')

    f.write('\nexport const trigrams = [\n')

    length = len(trigrams)
    for i, trigram in enumerate(trigrams):
        f.write(f'["{trigram[0]}", {trigram[1]}],\n')

    f.write('];')
    