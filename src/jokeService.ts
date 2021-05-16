import axios from 'axios'

enum JokeCategory {
    PROGRAMMING = "Programming",
}

enum JokeType {
    SINGLE = "single",
    TWO_PART = "twopart",
}

enum JokeLang {
    ENGLISH = "en"
}

interface Joke {
  error: Boolean,
  category: JokeCategory,
  type: JokeType,
  joke: string,
  flags: {
    nsfw: boolean,
    religious: boolean,
    political: boolean,
    racist: boolean,
    sexist: boolean,
    explicit: boolean,
  },
  setup: string,
  delivery: string,
  id: Number,
  safe: boolean,
  lang: JokeLang
};

export async function getJoke():Promise<Joke> {
    console.debug('Fetching Joke')
    const resp = await axios.get('https://v2.jokeapi.dev/joke/Programming');
    console.debug(resp.data)
    return resp.data;
}

export function formatJoke(joke:Joke):string {
    if(joke.type == JokeType.SINGLE) {
        return `JOKE\n${joke.joke}`
    }
    return `JOKE\n${joke.setup}\n-\n${joke.delivery}`
}