module.exports = {
  people: getPeople()
};

function getPeople() {
  return [
    { id: 1, firstName: 'John', lastName: 'Papa', age: 25,
    location: 'Alcoi',latitude:'43.260224',longitude:'-5.727997' },
    { id: 2, firstName: 'Ward', lastName: 'Bell', age: 31,
    location: 'Xativa',latitude:'38.990408',longitude:'-1.518675'},
    { id: 3, firstName: 'Colleen', lastName: 'Jones', age: 21,
    location: 'Enguera',latitude:'38.982403',longitude:'-0.66493' },
    { id: 4, firstName: 'Madelyn', lastName: 'Green', age: 18,
    location: 'Valencia',latitude:'39.460622',longitude:'-0.371046' },
    { id: 5, firstName: 'Ella', lastName: 'Jobs', age: 18,
    location: 'Madrid',latitude:'40.426343',longitude:'-3.676987' },
    { id: 6, firstName: 'Landon', lastName: 'Gates', age: 11,
    location: 'Granada',latitude:'37.1899',longitude:'-3.607206' },
    { id: 7, firstName: 'Haley', lastName: 'Guthrie', age: 35,
    location: 'Salamanca',latitude:'41.013662',longitude:'-5.727997' },
    { id: 8, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22,
    location: 'Bilbao',latitude:'43.260224',longitude:'-2.934508' },
    { id: 9, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22,
    location: 'Bilbao',latitude:'43.260224',longitude:'-3.934508'}
    ];
}
