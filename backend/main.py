import matplotlib.pyplot as plt

bigrams = {}
trigrams = {}


with open('./backend/words.txt', encoding='utf-8') as word_list:
    for word in word_list:
        word = word.rstrip('\n')
        word = word.lower()

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


print(sorted(trigrams.items(), key=lambda i: i[1]))
print(sorted(bigrams.items(), key=lambda i: i[1]))

# fig = plt.figure()
# ax = fig.add_subplot(111)
# ax.bar(bigrams.keys(), bigrams.values())
# plt.show()
