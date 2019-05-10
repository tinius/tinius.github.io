// first, load in the data

var data = [{"year":1880,"temperature":-0.19},{"year":1881,"temperature":-0.11},{"year":1882,"temperature":-0.12},{"year":1883,"temperature":-0.2},{"year":1884,"temperature":-0.3},{"year":1885,"temperature":-0.32},{"year":1886,"temperature":-0.33},{"year":1887,"temperature":-0.36},{"year":1888,"temperature":-0.18},{"year":1889,"temperature":-0.11},{"year":1890,"temperature":-0.37},{"year":1891,"temperature":-0.24},{"year":1892,"temperature":-0.27},{"year":1893,"temperature":-0.32},{"year":1894,"temperature":-0.32},{"year":1895,"temperature":-0.23},{"year":1896,"temperature":-0.12},{"year":1897,"temperature":-0.12},{"year":1898,"temperature":-0.28},{"year":1899,"temperature":-0.19},{"year":1900,"temperature":-0.09},{"year":1901,"temperature":-0.16},{"year":1902,"temperature":-0.3},{"year":1903,"temperature":-0.39},{"year":1904,"temperature":-0.49},{"year":1905,"temperature":-0.28},{"year":1906,"temperature":-0.23},{"year":1907,"temperature":-0.4},{"year":1908,"temperature":-0.44},{"year":1909,"temperature":-0.48},{"year":1910,"temperature":-0.43},{"year":1911,"temperature":-0.43},{"year":1912,"temperature":-0.36},{"year":1913,"temperature":-0.36},{"year":1914,"temperature":-0.16},{"year":1915,"temperature":-0.12},{"year":1916,"temperature":-0.33},{"year":1917,"temperature":-0.44},{"year":1918,"temperature":-0.28},{"year":1919,"temperature":-0.27},{"year":1920,"temperature":-0.26},{"year":1921,"temperature":-0.18},{"year":1922,"temperature":-0.27},{"year":1923,"temperature":-0.25},{"year":1924,"temperature":-0.25},{"year":1925,"temperature":-0.21},{"year":1926,"temperature":-0.09},{"year":1927,"temperature":-0.21},{"year":1928,"temperature":-0.19},{"year":1929,"temperature":-0.35},{"year":1930,"temperature":-0.15},{"year":1931,"temperature":-0.1},{"year":1932,"temperature":-0.17},{"year":1933,"temperature":-0.3},{"year":1934,"temperature":-0.14},{"year":1935,"temperature":-0.21},{"year":1936,"temperature":-0.16},{"year":1937,"temperature":-0.04},{"year":1938,"temperature":-0.04},{"year":1939,"temperature":-0.03},{"year":1940,"temperature":0.11},{"year":1941,"temperature":0.18},{"year":1942,"temperature":0.05},{"year":1943,"temperature":0.07},{"year":1944,"temperature":0.2},{"year":1945,"temperature":0.08},{"year":1946,"temperature":-0.07},{"year":1947,"temperature":-0.04},{"year":1948,"temperature":-0.11},{"year":1949,"temperature":-0.11},{"year":1950,"temperature":-0.18},{"year":1951,"temperature":-0.07},{"year":1952,"temperature":0.01},{"year":1953,"temperature":0.07},{"year":1954,"temperature":-0.15},{"year":1955,"temperature":-0.14},{"year":1956,"temperature":-0.21},{"year":1957,"temperature":0.04},{"year":1958,"temperature":0.07},{"year":1959,"temperature":0.03},{"year":1960,"temperature":-0.02},{"year":1961,"temperature":0.05},{"year":1962,"temperature":0.04},{"year":1963,"temperature":0.07},{"year":1964,"temperature":-0.2},{"year":1965,"temperature":-0.1},{"year":1966,"temperature":-0.05},{"year":1967,"temperature":-0.02},{"year":1968,"temperature":-0.07},{"year":1969,"temperature":0.07},{"year":1970,"temperature":0.03},{"year":1971,"temperature":-0.09},{"year":1972,"temperature":0.01},{"year":1973,"temperature":0.16},{"year":1974,"temperature":-0.08},{"year":1975,"temperature":-0.02},{"year":1976,"temperature":-0.11},{"year":1977,"temperature":0.17},{"year":1978,"temperature":0.06},{"year":1979,"temperature":0.16},{"year":1980,"temperature":0.27},{"year":1981,"temperature":0.33},{"year":1982,"temperature":0.13},{"year":1983,"temperature":0.31},{"year":1984,"temperature":0.16},{"year":1985,"temperature":0.12},{"year":1986,"temperature":0.18},{"year":1987,"temperature":0.33},{"year":1988,"temperature":0.41},{"year":1989,"temperature":0.28},{"year":1990,"temperature":0.44},{"year":1991,"temperature":0.41},{"year":1992,"temperature":0.22},{"year":1993,"temperature":0.24},{"year":1994,"temperature":0.31},{"year":1995,"temperature":0.45},{"year":1996,"temperature":0.34},{"year":1997,"temperature":0.47},{"year":1998,"temperature":0.62},{"year":1999,"temperature":0.4},{"year":2000,"temperature":0.4},{"year":2001,"temperature":0.53},{"year":2002,"temperature":0.62},{"year":2003,"temperature":0.61},{"year":2004,"temperature":0.53},{"year":2005,"temperature":0.67},{"year":2006,"temperature":0.62},{"year":2007,"temperature":0.64},{"year":2008,"temperature":0.52},{"year":2009,"temperature":0.63},{"year":2010,"temperature":0.7},{"year":2011,"temperature":0.59},{"year":2012,"temperature":0.62},{"year":2013,"temperature":0.65},{"year":2014,"temperature":0.73},{"year":2015,"temperature":0.87},{"year":2016,"temperature":0.99},{"year":2017,"temperature":0.91},{"year":2018,"temperature":0.83}] ;

// check we have 139 years of data
console.log(data.length);

// select the chart container so we can start adding new elements to it
var container = document.querySelector('.chart');

// start a loop to add one new element per entry
data.forEach( function(entry) {
  
  // elements are always added in two steps
  var stripe = document.createElement('div');
  container.appendChild(stripe);
  
  // give the new element a class
  stripe.className = 'stripe';
  
  // now, let's give the element the right colour
  var colour = '';
  
  var colourScale = chroma.scale('RdBu').domain([0.75, -0.75]);
  colour = colourScale(entry.temperature);
  
  stripe.style['background-color'] = colour;
  
  
} );