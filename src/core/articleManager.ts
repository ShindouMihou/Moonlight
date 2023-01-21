import {MMKVLoader} from "react-native-mmkv-storage";
import {Book} from "../types/book";
import {Chapter} from "../types/chapter";

const getBookIds = () => {
    const bookIds = books.getArray<string>('::cache')
    if (bookIds == null) return [] as string[]
    return bookIds
}
const upsertBook = (book: Book) => {
    books.setMap(book.id, book)

    const cache = getBookIds()
    if (!cache.includes(book.id)) {
        cache.push(book.id)
        books.setArray('::cache', cache)
    }
}
const getBooks = () => {
    const bookIds = getBookIds()
    return books.getMultipleItems<Book>(bookIds, 'object')
        .filter((arr) => arr[1] != null)
        .map((arr) => arr[1])
}
const upsertChapter = (bookId: string, chapter: Chapter) => {
    const book = getBook(bookId)
    if (book == null) {
        console.error('Book ' + bookId + ' cannot be found, therefore, chapter cannot be created.')
        return
    }
    chapters.setMap(chapter.id, chapter)
    if (!book.articles.includes(chapter.id)) {
        book.articles.push(chapter.id)
    }
    upsertBook(book)
}
const getBook = (id: string) => books.getMap<Book>(id)
const deleteBook = (id: string) => {
    const book = getBook(id)
    for (const chapter of book.articles) {
        chapters.removeItem(chapter)
    }

    books.removeItem(id)

    const cache = getBookIds()
    books.setArray('::cache', cache.filter((key) => key !== id))
}
const getChapter = (id: string) => chapters.getMap<Chapter>(id)
const getChapters = (id: string) => {
    const book = getBook(id)
    if (book == null) {
        console.error('Book ' + id + ' cannot be found, therefore, no chapters can be retrieved.')
        return []
    }
    return chapters.getMultipleItems<Chapter>(book.articles, 'object')
        .filter((arr) => arr[1] != null)
        .map((arr) => arr[1])
}

const books = new MMKVLoader()
    .withServiceName('moonlight')
    .withInstanceID('books')
    .initialize();
const chapters = new MMKVLoader()
    .withServiceName('moonlight')
    .withInstanceID('chapters')
    .initialize()

export const ArticleManager = { books, chapters, createBook: upsertBook, deleteBook, getBook, getBooks, createChapter: upsertChapter, getChapter, getChapters }