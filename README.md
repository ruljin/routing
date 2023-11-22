# Słowem wstępu ...

Przed rozpoczęciem przerabiania materiału, zawartego w tym repozytorium (oczywiście, jeżeli zamierzasz spróbować swoich własnych sił - dostajesz przecież do ręki gotowe rozwiązanie z opracowaniem, doh?) utwórz nowy projekt _CRA_ z wykorzystaniem polecenia:

```bash
npx create-react-app twoja_nazwa_projektu --template typescript
```

A następnie usuń w komponencie `App.tsx` w jego kodzie `JSX`, wszystko co znajduje się między tagami `<div>`. Dodatkowo, usuń wszystkie niepotrzebne (lub przynajmniej wykrywane jako takie), `import` w nim. W efekcie czego, Twój `App.tsx` powinien wyglądać następująco:

```typescript
import "./App.css";

function App() {
  return <div className="App"></div>;
}

export default App;
```

Usuń też całą zawartość pliku `App.css` lub `App.scss`, jeżeli masz zainstalowany preprocesor `SASS`.Z tak przygotowanym projektem, możemy rozpocząć zabawę. Zapraszam!

## Co to jest Routing?

**Routing** w aplikacjach webowych, to sposób w jaki decyduje ona o tym, jaki zasób w postaci strony, widoku czy czegokolwiek innego ma ona wyświetlić użytkownikowi w odpowiedzi na jego działanie.

Najbliższą temu analogią, będzie porównanie tego do kiedyś częściej używanych map drogowych, gdzie każda trasa określona jest w celu dotarcia z punktu A do punktu B. W przypadku stron i aplikacji internetowych, określa ona jakie elementy powinny być wyświetlane w reakcji na różne wartości w adresie URL, które są wprowadzone przez użytkownika w przeglądarce.

W _React_ cały temat **routingu** rozbija się o to jakie komponenty ma wyświetlić na poszczególnych ścieżkach **URL**. **Routing** po stronie frontu w aplikacjach **SPA** różni się od **routingu** po stronie backu. Jako, że mowa o **Single Page Application** (czyli aplikacji jednostronnicowej), przekierowanie następuje w obrębie jednej strony, więc nie ma żadnego przeładowywania a adres **URL** jest zmieniany w trochę sztuczny sposób, co w konsekwencji nie powoduje przeładowania.

Sam _React_ jako biblioteka UI, nie ma zaimplementowanego w sobie żadnego mechanizmu do **routingu**, jakiego używają aplikacje typu **SPA**.

W tym celu trzeba zainstalować zewnętrzną bibliotekę. Jest ich kilka ale najpopularniejszą jest **React Router**, której użyjemy.

## Instalacja "React-Router"

Żeby zainstalować **React Router**, wystarczy wpisać polecenie (z wykorzystaniem _npm_):

```bash
npm install react-router-dom --save
```

## Wykorzystanie komponentu "BrowserRouter"

Żeby nasza aplikacja mogła korzystać z mechanizmu _routingu_, jaki udostępnia biblioteka **React Router**, możemy w pliku `index.tsx` zrobić następującą rzecz:

```typescript
import { BrowserRouter } from "react-router-dom";
// ...
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

Komponent ten, przechowuje informacje na temat naszej aktualnej lokacji (w aplikacji) w pasku adresu **URL** tworząc ładnie wyglądające i proste w odczytaniu adresy oraz pozwala na nawigowanie po niej, wykorzystując wbudowany w przeglądarkę tzw. _history API_.

Więcej o tym komponencie, możecie znaleźć [tu](https://reactrouter.com/en/main/router-components/browser-router).

## Ścieżki - czyli komponenty "Routes" i "Route"

Na początek, utwórzmy sobie katalog `components` a w nim trzy komponenty funkcyjne:

- Users,
- User,
- Technologies.

Niech każdy komponent wygląda na ten moment w następujący sposób:

```typescript
export const COMPONENT_NAME = () => <div>COMPONENT_NAME</div>;
```

Gdzie odpowiednio w miejsce `COMPONENT_NAME` wstawimy `Users`, `User` oraz `Technologies`. Następnie, przejdźmy do komponentu `App.tsx` i zaimportujmy stworzone przez siebie komponenty oraz komponenty `Routes` i `Route` z biblioteki `react-router-dom`:

```typescript
import { Routes, Route } from "react-router-dom";
import { Users } from "./components/Users";
import { User } from "./components/User";
import { Technologies } from "./components/Technologies";
```

Teraz, żeby routing w naszej aplikacji zaczął działać tak jak tego od niego oczekujemy, musimy skonfigurować ścieżki. Do tego celu służą komponenty `Routes` oraz `Route`.

`Route` jest najważniejszym elementem naszego routingu, opartego o bibliotekę _React Router_. Łączą one adresy _URL_ w naszej aplikacji z odpowiadającymi im komponentami, mechanizmem ładowania danych oraz modyfikacją ich. Dzięki właśnie temu komponentowi i zagnieżdżaniu jednego w drugim, budowanie aplikacji SPA o złożonej kompozycji staje się dużo prostsze.

`Routes`, działą jako swego rodzaju agregat i drogowskaz dla wszystkich zagnieżdżonych w nim `Route`. Odpowiada on za dopasowywanie (a tym samym wybór) najlepiej odpowiadającej aktualnemu adresowi _URL_ ścieżki ze wszystkich, zagnieżdżonych w nim od punktu adresu, w którym aktualnie jesteśmy.

Tym samym, tworząc następujący kod:

```typescript
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user" element={<User />} />
        <Route path="/technologies" element={<Technologies />} />
      </Routes>
    </div>
  );
}
```

Stworzyliśmy nasz pierwszy _routing_, dzięki czemu pod adresami _URL_ podanymi jako wartość, _props_ **path**, znajdziemy odpowiednie komponenty, które podaliśmy w _props_ **element**. Żeby to sprawdzić, zmień w pasku adresu, adres na `/`, `/user` i `/technologies` i zobacz co się stanie.

Więcej o `Routes` znajdziesz [tu](https://reactrouter.com/en/main/components/routes) a o `Route`, [tu](https://reactrouter.com/en/main/route/route).

### Nawigacja - czyli komponent "Link"

Przenoszenie się w różne miejsca naszej aplikacji poprzez ręczne wpisywanie tekstu w pasku adresu nie wydaje się zbyt mądre a tym bardziej wygodne. Nieważne, czy mówimy o nas samych czy o naszych przyszłych użytkownikach. Należy to zmienić.

W tym celu, utwórzmy następny komponent, `Navigation` i zaimportujmy do niego komponent `Link` z biblioteki `react-router-dom`:

```typescript
import { Link } from "react-router-dom";

export const Navigation = () => (
  <nav>
    <Link to="/">Users</Link>
    <Link to="/user">User</Link>
    <Link to="/technologies">Technologies</Link>
  </nav>
);
```

Stworzyliśmy tym samym komponent nawigujący wraz z linkami nawigacyjnymi, które będą automatycznie przekierowywać użytkownika do odpowiadających linkom adresom _URL_ podanym w _props_ **to**. Dzięki czemu, zrzuciliśmy z barków naszych oraz użytkowników, potrzebę ręcznej zmiany adresu.

Nie moglibyśmy zastosować tu klasycznej nawigacji z wykorzystaniem znacznika `<a>` oraz atrybutu `href`, ponieważ musielibyśmy znać **pełne ścieżki** a w tym - **adres domeny**. Aby rozwiązać ten problem, komponent `Link` z biblioteki `react-router-dom`, którego użyliśmy, przyjmuje atrybut typu `string`, który pozwala mu na przekierowanie nas w odpowiednie miejsce bez wiedzy na temat wspomnianych elementów. Przy współpracy oczywiście z całym mechanizmem _routingu_, zawartym w tej bibliotece.

W efekcie czego, po zaimportowaniu tego komponentu w naszym `App.tsx` i wykorzystania go w kodzie, powinniśmy uzyskać następujący efekt:

```typescript
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation"; // <-- Dodaliśmy
import { Users } from "./components/Users";
import { User } from "./components/User";
import { Technologies } from "./components/Technologies";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation /> {/* <-- Dodaliśmy */}
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user" element={<User />} />
        <Route path="/technologies" element={<Technologies />} />
      </Routes>
    </div>
  );
}

export default App;
```

Dzięki stworzonej przez nas nawigacji, po naszej aplikacji można się już poruszać bez trudu.

Więcej na temat tego komponentu, znajdziesz [tu](https://reactrouter.com/en/main/components/link).

### Parametry URL

Dodajmy sobie w naszym `App.tsx` do `Route`, prowadzącego do komponentu `User`, małą zmianę. Mianowicie zmodyfikujmy wartość jego **path**:

```typescript
// ...
function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/:userId" element={<User />} /> {/* <-- Dodaliśmy */}
        <Route path="/technologies" element={<Technologies />} />
      </Routes>
    </div>
  );
}
// ...
```

Parametry to znaczniki miejsca w adresie _URL_, które zaczynają się od dwukropka, jak np. parametr `:userId` w tym przykładzie. Jeżeli którykolwiek segment (czyli treść między `/`) w **path** zaczyna się od _:_, staje się on tzw. **dynamicznym segmentem** (ang. **dynamic segment**). Podczas wiązania adresu, taki segment zostanie wykryty i skopiowany z adresu i przesłany jako **params** do innych API dostępnych w _routingu_.

W tym celu, musimy te informować odebrać w komponencie `User` by móc je wykorzystać. Informacje te mogą przydać się do wielu rzeczy tj. obsługa błędu lub braku dostępu do danych, wysłanie zapytania do serwera o konkretne dane itp.. W celu wyciągnięcia tych informacji, musimy zaimportować i użyć hooka `useParams` z biblioteki `react-router-dom`. Zmodyfikujmy komponent `User` w następujący sposób:

```typescript
import { useParams } from "react-router-dom";

const USERS = [
  { userId: 1, name: "Josh", gender: "male" },
  { userId: 2, name: "Emilly", gender: "female" },
  { userId: 3, name: "Pop", gender: "non binary" },
];

export const User = () => {
  const { userId } = useParams();

  const userToDisplay = userId
    ? USERS.find((user) => user.userId === parseInt(userId))
    : null;

  if (!userToDisplay) {
    return (
      <div>
        Cannot display user data. Check whether the provided ID exists or is
        correct.
      </div>
    );
  }

  return (
    <section>
      <h3>User data</h3>
      <div>Name: {userToDisplay.name}</div>
      <div>Gender: {userToDisplay.gender}</div>
    </section>
  );
};
```

Następnie, usuńmy z komponentu `Navigation` link do `User`:

```typescript
import { Link } from "react-router-dom";

export const Navigation = () => (
  <nav>
    <Link to="/">Users</Link>
    <Link to="/technologies">Technologies</Link>
  </nav>
);
```

Pozostawienie tego linku w jego starej formie, spowodowałoby same problemy. Jeżeli wpiszemy ręcznie adresu kończący się `/user/:userId` gdzie `userId` to `userId`, któregokolwiek obiektu z dodanej przez nas tablicy `USERS`, na ekranie pojawi się nam strona z informacjami na temat danego użytkownika. Jeżeli natomiast, podamy taki `userId`, który nie jest przypisany do żadnego z `user` z tablicy, pojawi się nam informacja, że użytkownik taki nie istnieje i że powinniśmy się upewnić, czy użytkownik o takim ID istnieje lub czy samo ID - jest poprawne.

### Zagnieżdżanie ścieżek

Stwórzmy komponent `Home`:

```typescript
export const Home = () => <div>Hi! Welcome in our "Routing" app!</div>;
```

Przeróbmy odrobinę również komponent `Navigation`:

```typescript
import { Link } from "react-router-dom";

export const Navigation = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/users">Users</Link>
    <Link to="/technologies">Technologies</Link>
  </nav>
);
```

W kolejnym kroku, utwórzmy katalog `constants` a w nim plik `users.ts` i przenieśmy do niego (i wyeksportujmy) naszą tablicę `USERS`:

```typescript
export const USERS = [
  { userId: 1, name: "Josh", gender: "male" },
  { userId: 2, name: "Emilly", gender: "female" },
  { userId: 3, name: "Pop", gender: "non binary" },
];
```

Tym samym, możemy usunąć ją z komponentu `User` i ją tam zaimportować.

```typescript
import { useParams } from "react-router-dom";
import { USERS } from "../constants/users";

export const User = () => {
  const { userId } = useParams();

  const userToDisplay = userId
    ? USERS.find((user) => user.userId === parseInt(userId))
    : null;

  if (!userToDisplay) {
    return (
      <div>
        Cannot display user data. Check whether the provided ID exists or is
        correct.
      </div>
    );
  }

  return (
    <section>
      <div>User data:</div>
      <div>Name: {userToDisplay?.name}</div>
      <div>Gender: {userToDisplay?.gender}</div>
    </section>
  );
};
```

Następnie, utwórzmy sobie komponent `UsersList`:

```typescript
import { Link } from "react-router-dom";
import { USERS } from "../constants/users";

export const UsersList = () => (
  <div>
    <h3>Users list</h3>
    {USERS.map((user) => (
      <Link key={user.name} to={`/users/${user.userId}`}>
        {user.name}
      </Link>
    ))}
  </div>
);
```

I na koniec, zmodyfikujmy nasz `App.tsx`:

```typescript
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home"; // <-- Dodaliśmy
import { Users } from "./components/Users";
import { UsersList } from "./components/UsersList"; // <-- Dodaliśmy
import { User } from "./components/User";
import { Technologies } from "./components/Technologies";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} /> {/* <-- Dodaliśmy */}
        <Route path="/users" element={<Users />}>
          <Route path="/list" element={<UsersList />} />
          <Route path=":userId" element={<User />} />
        </Route>
        <Route path="/technologies" element={<Technologies />} />
      </Routes>
    </div>
  );
}

export default App;
```

Jeśli w pasku adresu wpiszemy `users/list`, powinniśmy zobaczyć wyrenderowane dwa komponenty: `Users` (ze względu na dopasowanie ścieżki `users`) oraz `UsersList` (ze względu na dopasowanie ścieżki `users/list`). Zobaczymy w efekcie jedynie wyrenderowany komponent `Users`. Dzieje się tak dlatego, że _React Router_ nie wie, gdzie powinien renderować zagnieżdżony komponent. Wie tylko, gdzie umieścić główną ścieżkę, a nie zagnieżdżone podścieżki.

Zmodyfikujmy komponent `Users`:

```typescript
import { Outlet } from "react-router-dom";

export const Users = () => (
  <div>
    <h2>Users</h2>
    <Outlet />
  </div>
);
```

Wyjaśnijmy sobie co zrobiliśmy oraz po co. Komponent `Outlet`, powinien być używany w ścieżce, którą możemy nazwać `rodzicem` dla swoich ścieżek potomnych, które będą wyświetlane w nim. Pozwala nam on na wyświetlanie zagnieżdżonych elementów UI tylko wtedy, gdy odpowiednia ścieżka `potomna` zostanie wybrana. W alternatywie, jeżeli ścieżka zostanie dopasowana jedynie częściowo (część odpowiedzialna za samego rodzica), wyświetlony zostanie komponent z atrybutem `index` (o czym później) albo nic - jeżeli ścieżki z takim atrybutem, nie ma.

Jeżeli wpiszemy w miejsce na adres `users/list`, wyrenderuje się nam komponent `UsersList`, wewnątrz komponentu `Users`.

Więcej na temat `Outlet`, znajdziesz [tu](https://reactrouter.com/en/main/components/outlet).

### Ścieżka domyślna

Komponent `Route` posiada właściwość `index`, która mówimy o tym czy dana ścieżka ma być traktowana jako domyślna w danej lokalizacji. Jest to przydatne, gdy nie wybrana została żadna konkretna ścieżka. Dobrym przykładem takiego zastosowania, może być komponent powitalny wewnątrz strony głównej lub ekran **Dashboard** w wielu, współczesnych aplikacjach. Możemy dodać ten atrybut naszemu `Route` prowadzącego do `Users`.

```typescript
// ...
<Route path="/users" element={<Users />}>
  <Route index element={<UsersList />} />
  <Route path="/user/:userId" element={<User />} />
</Route>
// ...
```

### Aktywna strona/strony

W dobie dzisiejszych aplikacji internetowych, wyświetlanie w sposób odmienny _"linka"_, reprezentującego hiperłącze do strony na której aktualnie przebywamy jest czymś naturalnym i nie wymaga opatrzenia jakimkolwiek komentarzem. _React Router_ daje możliwość dodania odpowiednich styli dla aktywnych linków (i sam określa, który jest w danym momencie aktywny) na dwa sposoby:

- stylując go,
- za pomocą _props_ _className_.

Przeróbmy nasz komponent `Navigation`:

```typescript
import { NavLink } from "react-router-dom";

export const Navigation = () => (
  <nav>
    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">
      Home
    </NavLink>
    <NavLink
      className={({ isActive }) => (isActive ? "active" : "")}
      to="/users"
    >
      Users
    </NavLink>
    <NavLink
      className={({ isActive }) => (isActive ? "active" : "")}
      to="/technologies"
    >
      Technologies
    </NavLink>
  </nav>
);
```

Przebudowaliśmy cały nasz komponent. Zamieniliśmy komponenty `Link` na `NavLink` oraz użyliśmy _props_ `className` w nietypowy sposób. `NavLink` daje dostęp do informacji na temat swojego stanu w _props_ `className` dzięki czemu, łatwiej jesteśmy w stanie określić czy jest aktywny czy też nie. Teraz dodajmy style w pliku `App.css`:

```css
.active {
  font-weight: 700;
  color: blue;
}
```

Gdy klikniemy teraz w odpowiedni link i przeniesie nas na inną podstronę, powinniśmy zauważyć, że odpowiadający stronie `NavLink` będzie teraz ostylowany tak jak tego chcieliśmy. `NavLink` domyślnie otrzymuje klasę `active` gdy w takim stanie jest, dlatego alternatywnie, możemy go ostylować. W naszym przypadku wyglądałoby to w następujący sposób:

```css
nav a.active {
  color: red;
}
```

Jeżeli zakomentujemy teraz poprzednią regułę stylującą oraz usuniemy na `NavLink` fragment kodu dotyczący `className` robiąc te same akcje co wcześniej, uzyskamy oczekiwany efekt. `NavLink` jest specjalym typem komponentu `Link`, który wie w jakim znajduje się stanie - _active_, _pending_ czy też _transitioning_.

Więcej na temat `NavLink` możesz przeczytać [tu](https://reactrouter.com/en/main/components/nav-link).

### Ręczna nawigacja

Powrót do listy użytkowników stał się teraz bardzo problematyczny z naszej strony z użytkownikami. Chyba, że użyjemy przycisku _wstecz_ w przeglądarce. Ale na dłużej, jest to niewygodne. Czasami, musimy samodzielnie nawigować użytkownika z jednej strony na drugą. W takich przypadkach możemy użyć hooka `useNavigate`. Przeróbmy nasz komponent `User`:

```typescript
import { useParams, useNavigate } from "react-router-dom";
import { USERS } from "../constants/users";

export const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const userToDisplay = userId
    ? USERS.find((user) => user.userId === parseInt(userId))
    : null;

  if (!userToDisplay) {
    return <div>Cannot display user data.</div>;
  }

  return (
    <section>
      <h3>User data</h3>
      <div>Name: {userToDisplay.name}</div>
      <div>Gender: {userToDisplay.gender}</div>
      <button onClick={() => navigate("/users")}>Go back to users list</button>
    </section>
  );
};
```

