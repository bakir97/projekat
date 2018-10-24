# projekat
Projekat sa Last.fm Api-om
Postignuto:
- Uspješno pronalaženje država i prikazivanja istih te spremanja u AsyncStorage,tako da se ponovo ne moraju dohvatati,
- Uspješna implementacija pretraživanja određene države,
- Uspješna implementacija navigacije,
- Uspješno pronalaženje trackova za određenu državu i prikazivanje istih kao lista sa limitom od 20 trackova,
- Uspješna implementacija paginationa odnosno prikazivanja 20 novih trackova,
- Uspješno prikazivanje jednog tracka, sa dodatnim informacija,
- Uspješno prikazivanje modal-a za upis potrebnih podataka klikom na srce,odnosno modal se neće prikazati ako smo vec jednom upisali podatke, sačuvaju se u AsyncStorage ali postoji mogučnost brisanja istih sa dugmetom  logout.
- Uspješno prikazivanje spinnera dok se učitavaju podaci,te prikaz zamjenskog teksta ako dođe do greške,
- Uspješna promjena stanja pojedinih screen-ova prilikom promjene konekcije interneta,te prikaz teksa u slučaju da nema konekcije,
- Uspješna realizacija error hendlinga pomoću Toast popups,
- Uspješno razdvajanje komponente na manje dijelove moglo se još više razdvojiti ali za ovako malu aplikaciju nije potrebno.

## Korištene libraries:
- Redux
- Redux-thunk
- Axios
- NativeBase za UI
- React-navigation
- Jest za testiranje
### Problemi:
- Zastave država : problem je bio što su zastave sačuvane u vidu .svg, a react-native ima problem sa svg ekstenzijama pogotovo zbog velikog broja istih pokušavao sam sa nekim library-ma ali bude veliki performance problem zbog velikog broja,tako da sam malo zaobišao taj problem korištenjem drugog linka i mijenjanja samo naziva linka,što možete vidjeti u Home komponenti,samo par država nema sliku, koje su slabije poznate.
- Love Track: Problem sa funkcijom love.track nastaje u zadnjem koraku, kada treba poslati post request da se doda track,pokušavao sam na više načina riješiti ali trenutno jos nije riješen. Prvi korak uspješno prođe(getMobileSession) dobijem nazad key ali kada želim da pošaljem love.rack request dobijem nazad Invalid parameters - Your request is missing a required parameter, iako sam više puta provjerio da su svi parametri tu. Ovaj problem se nalazi u src/redux/actions/trackLoveActions.js,privremeno sam stavio popup da se pojavi dok ne riješim isti.
