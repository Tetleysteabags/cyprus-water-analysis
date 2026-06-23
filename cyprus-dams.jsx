import React, { useState, useMemo } from "react";
const DATA = {"snapshotDate":"2026-06-05","source":"Cyprus Water Development Department, via fragmata.info (CC-attribution; Vladimir Bugay)","totalCapacity":290.804,"history":[{"date":"1988-01-01","kouris":8.02,"asprokremmos":36.29,"evretou":8.36,"kannaviou":null,"germasoyeia":7.34,"totalAll":68.79},{"date":"1988-01-15","kouris":8.97,"asprokremmos":36.79,"evretou":8.39,"kannaviou":null,"germasoyeia":7.53,"totalAll":70.97},{"date":"1988-02-01","kouris":14.23,"asprokremmos":42.38,"evretou":9.54,"kannaviou":null,"germasoyeia":9.74,"totalAll":88.5},{"date":"1988-02-15","kouris":16.95,"asprokremmos":44.93,"evretou":10.18,"kannaviou":null,"germasoyeia":10.26,"totalAll":96.52},{"date":"1988-03-01","kouris":22.49,"asprokremmos":51.92,"evretou":12.36,"kannaviou":null,"germasoyeia":12.04,"totalAll":116.12},{"date":"1988-03-15","kouris":42.04,"asprokremmos":52.38,"evretou":16.2,"kannaviou":null,"germasoyeia":13.5,"totalAll":151.64},{"date":"1988-04-01","kouris":51.45,"asprokremmos":52.38,"evretou":19.2,"kannaviou":null,"germasoyeia":13.5,"totalAll":170.01},{"date":"1988-04-15","kouris":52.82,"asprokremmos":52.32,"evretou":19.52,"kannaviou":null,"germasoyeia":13.5,"totalAll":173.95},{"date":"1988-05-01","kouris":51.95,"asprokremmos":52.28,"evretou":19.57,"kannaviou":null,"germasoyeia":13.5,"totalAll":174.32},{"date":"1988-05-15","kouris":52.31,"asprokremmos":52.11,"evretou":19.54,"kannaviou":null,"germasoyeia":13.49,"totalAll":174.03},{"date":"1988-06-01","kouris":52.46,"asprokremmos":51.89,"evretou":19.27,"kannaviou":null,"germasoyeia":13.16,"totalAll":172.24},{"date":"1988-06-15","kouris":52.37,"asprokremmos":51.41,"evretou":18.91,"kannaviou":null,"germasoyeia":12.66,"totalAll":169.62},{"date":"1988-07-01","kouris":52.54,"asprokremmos":50.58,"evretou":18.44,"kannaviou":null,"germasoyeia":12.32,"totalAll":166.71},{"date":"1988-07-15","kouris":52.08,"asprokremmos":49.49,"evretou":18.01,"kannaviou":null,"germasoyeia":11.68,"totalAll":162.33},{"date":"1988-08-01","kouris":51.15,"asprokremmos":48.13,"evretou":17.45,"kannaviou":null,"germasoyeia":10.83,"totalAll":156.56},{"date":"1988-08-15","kouris":50.32,"asprokremmos":46.79,"evretou":17.09,"kannaviou":null,"germasoyeia":10.12,"totalAll":151.65},{"date":"1988-09-01","kouris":48.64,"asprokremmos":45.36,"evretou":16.67,"kannaviou":null,"germasoyeia":9.18,"totalAll":145.15},{"date":"1988-09-15","kouris":46.84,"asprokremmos":44.17,"evretou":16.31,"kannaviou":null,"germasoyeia":8.4,"totalAll":139.33},{"date":"1988-10-01","kouris":44.85,"asprokremmos":43.01,"evretou":15.89,"kannaviou":null,"germasoyeia":7.54,"totalAll":133.28},{"date":"1988-10-15","kouris":44.25,"asprokremmos":42.28,"evretou":15.6,"kannaviou":null,"germasoyeia":6.98,"totalAll":130.08},{"date":"1988-11-01","kouris":44.5,"asprokremmos":41.91,"evretou":15.38,"kannaviou":null,"germasoyeia":6.58,"totalAll":128.6},{"date":"1988-11-15","kouris":45.08,"asprokremmos":41.89,"evretou":15.28,"kannaviou":null,"germasoyeia":6.47,"totalAll":128.77},{"date":"1988-12-01","kouris":45.79,"asprokremmos":41.71,"evretou":15.19,"kannaviou":null,"germasoyeia":6.31,"totalAll":128.96},{"date":"1988-12-15","kouris":45.88,"asprokremmos":41.87,"evretou":15.08,"kannaviou":null,"germasoyeia":6.13,"totalAll":129.21},{"date":"1989-01-01","kouris":50.24,"asprokremmos":48.27,"evretou":13.8,"kannaviou":null,"germasoyeia":7.42,"totalAll":144.3},{"date":"1989-01-15","kouris":62.92,"asprokremmos":52.38,"evretou":13.53,"kannaviou":null,"germasoyeia":13.5,"totalAll":178.74},{"date":"1989-02-01","kouris":68.84,"asprokremmos":51.81,"evretou":12.38,"kannaviou":null,"germasoyeia":12.14,"totalAll":188.4},{"date":"1989-02-15","kouris":70.5,"asprokremmos":51.31,"evretou":12.75,"kannaviou":null,"germasoyeia":12.64,"totalAll":192.2},{"date":"1989-03-01","kouris":71.26,"asprokremmos":51.39,"evretou":12.96,"kannaviou":null,"germasoyeia":12.99,"totalAll":195.17},{"date":"1989-03-15","kouris":72.49,"asprokremmos":51.57,"evretou":13.1,"kannaviou":null,"germasoyeia":13.34,"totalAll":197.39},{"date":"1989-04-01","kouris":72.98,"asprokremmos":51.73,"evretou":13.14,"kannaviou":null,"germasoyeia":13.5,"totalAll":198.87},{"date":"1989-04-15","kouris":72.03,"asprokremmos":51.45,"evretou":12.83,"kannaviou":null,"germasoyeia":13.49,"totalAll":197.05},{"date":"1989-05-01","kouris":70.5,"asprokremmos":50.73,"evretou":12.59,"kannaviou":null,"germasoyeia":13.36,"totalAll":193.12},{"date":"1989-05-15","kouris":69.3,"asprokremmos":50.18,"evretou":12.4,"kannaviou":null,"germasoyeia":13.03,"totalAll":189.7},{"date":"1989-06-01","kouris":67.52,"asprokremmos":49.16,"evretou":12.11,"kannaviou":null,"germasoyeia":12.23,"totalAll":183.94},{"date":"1989-06-15","kouris":66.25,"asprokremmos":48.3,"evretou":11.86,"kannaviou":null,"germasoyeia":11.47,"totalAll":179.19},{"date":"1989-07-01","kouris":64.23,"asprokremmos":47.42,"evretou":11.52,"kannaviou":null,"germasoyeia":10.65,"totalAll":173.25},{"date":"1989-07-15","kouris":62.84,"asprokremmos":46.27,"evretou":11.18,"kannaviou":null,"germasoyeia":10.02,"totalAll":167.78},{"date":"1989-08-01","kouris":61.14,"asprokremmos":44.49,"evretou":10.78,"kannaviou":null,"germasoyeia":9.24,"totalAll":160.87},{"date":"1989-08-15","kouris":59.4,"asprokremmos":42.92,"evretou":10.58,"kannaviou":null,"germasoyeia":8.48,"totalAll":154.71},{"date":"1989-09-01","kouris":56.85,"asprokremmos":41.41,"evretou":10.12,"kannaviou":null,"germasoyeia":7.46,"totalAll":147.06},{"date":"1989-09-15","kouris":54.97,"asprokremmos":40.18,"evretou":9.71,"kannaviou":null,"germasoyeia":6.74,"totalAll":141.13},{"date":"1989-10-01","kouris":53.06,"asprokremmos":38.79,"evretou":9.39,"kannaviou":null,"germasoyeia":6.02,"totalAll":135.11},{"date":"1989-10-15","kouris":51.16,"asprokremmos":38.19,"evretou":9.29,"kannaviou":null,"germasoyeia":5.44,"totalAll":130.83},{"date":"1989-11-01","kouris":50.06,"asprokremmos":37.31,"evretou":9.0,"kannaviou":null,"germasoyeia":4.89,"totalAll":127.05},{"date":"1989-11-15","kouris":49.32,"asprokremmos":36.82,"evretou":8.93,"kannaviou":null,"germasoyeia":4.61,"totalAll":124.77},{"date":"1989-12-01","kouris":49.03,"asprokremmos":36.73,"evretou":8.9,"kannaviou":null,"germasoyeia":4.33,"totalAll":123.58},{"date":"1989-12-15","kouris":48.46,"asprokremmos":36.56,"evretou":8.83,"kannaviou":null,"germasoyeia":4.2,"totalAll":122.58},{"date":"1990-01-01","kouris":47.59,"asprokremmos":36.38,"evretou":8.75,"kannaviou":null,"germasoyeia":4.11,"totalAll":121.91},{"date":"1990-01-15","kouris":46.62,"asprokremmos":36.25,"evretou":8.78,"kannaviou":null,"germasoyeia":3.99,"totalAll":121.19},{"date":"1990-02-01","kouris":45.67,"asprokremmos":36.02,"evretou":8.57,"kannaviou":null,"germasoyeia":3.82,"totalAll":120.0},{"date":"1990-02-15","kouris":46.86,"asprokremmos":36.77,"evretou":8.92,"kannaviou":null,"germasoyeia":5.14,"totalAll":126.73},{"date":"1990-03-01","kouris":48.01,"asprokremmos":38.15,"evretou":9.74,"kannaviou":null,"germasoyeia":6.59,"totalAll":134.56},{"date":"1990-03-15","kouris":48.19,"asprokremmos":38.76,"evretou":10.26,"kannaviou":null,"germasoyeia":6.95,"totalAll":137.66},{"date":"1990-04-01","kouris":47.7,"asprokremmos":38.2,"evretou":10.39,"kannaviou":null,"germasoyeia":7.12,"totalAll":137.42},{"date":"1990-04-15","kouris":47.25,"asprokremmos":37.89,"evretou":10.32,"kannaviou":null,"germasoyeia":7.11,"totalAll":136.18},{"date":"1990-05-01","kouris":46.05,"asprokremmos":37.47,"evretou":10.19,"kannaviou":null,"germasoyeia":6.84,"totalAll":132.91},{"date":"1990-05-15","kouris":44.44,"asprokremmos":37.02,"evretou":10.03,"kannaviou":null,"germasoyeia":6.54,"totalAll":129.11},{"date":"1990-06-01","kouris":42.12,"asprokremmos":36.36,"evretou":9.76,"kannaviou":null,"germasoyeia":5.96,"totalAll":123.47},{"date":"1990-06-15","kouris":40.08,"asprokremmos":35.7,"evretou":9.49,"kannaviou":null,"germasoyeia":5.46,"totalAll":118.15},{"date":"1990-07-01","kouris":37.72,"asprokremmos":34.67,"evretou":9.09,"kannaviou":null,"germasoyeia":4.9,"totalAll":111.88},{"date":"1990-07-15","kouris":35.52,"asprokremmos":33.59,"evretou":8.74,"kannaviou":null,"germasoyeia":4.37,"totalAll":105.94},{"date":"1990-08-01","kouris":32.7,"asprokremmos":31.85,"evretou":8.31,"kannaviou":null,"germasoyeia":3.75,"totalAll":98.34},{"date":"1990-08-15","kouris":30.39,"asprokremmos":30.28,"evretou":7.95,"kannaviou":null,"germasoyeia":3.2,"totalAll":91.87},{"date":"1990-09-01","kouris":27.86,"asprokremmos":28.69,"evretou":7.42,"kannaviou":null,"germasoyeia":2.46,"totalAll":84.9},{"date":"1990-09-15","kouris":25.9,"asprokremmos":27.43,"evretou":6.97,"kannaviou":null,"germasoyeia":2.15,"totalAll":79.57},{"date":"1990-10-01","kouris":23.61,"asprokremmos":26,"evretou":6.67,"kannaviou":null,"germasoyeia":1.66,"totalAll":73.38},{"date":"1990-10-15","kouris":21.82,"asprokremmos":25.04,"evretou":6.5,"kannaviou":null,"germasoyeia":1.33,"totalAll":68.73},{"date":"1990-11-01","kouris":19.64,"asprokremmos":23.81,"evretou":6.33,"kannaviou":null,"germasoyeia":0.98,"totalAll":63.82},{"date":"1990-11-15","kouris":18.62,"asprokremmos":23.12,"evretou":6.18,"kannaviou":null,"germasoyeia":0.76,"totalAll":61.09},{"date":"1990-12-01","kouris":17.25,"asprokremmos":22.41,"evretou":6.05,"kannaviou":null,"germasoyeia":0.56,"totalAll":58.23},{"date":"1990-12-15","kouris":16.65,"asprokremmos":22.2,"evretou":6,"kannaviou":null,"germasoyeia":0.43,"totalAll":56.93},{"date":"1991-01-01","kouris":15.61,"asprokremmos":21.95,"evretou":5.92,"kannaviou":null,"germasoyeia":0.25,"totalAll":55.15},{"date":"1991-01-15","kouris":15.41,"asprokremmos":21.75,"evretou":5.88,"kannaviou":null,"germasoyeia":0.2,"totalAll":54.49},{"date":"1991-02-01","kouris":14.97,"asprokremmos":21.64,"evretou":5.83,"kannaviou":null,"germasoyeia":0.25,"totalAll":54.1},{"date":"1991-02-15","kouris":14.8,"asprokremmos":21.3,"evretou":5.78,"kannaviou":null,"germasoyeia":0.3,"totalAll":54.11},{"date":"1991-03-01","kouris":15.19,"asprokremmos":21.11,"evretou":5.75,"kannaviou":null,"germasoyeia":0.51,"totalAll":55.3},{"date":"1991-03-15","kouris":15.61,"asprokremmos":20.85,"evretou":5.74,"kannaviou":null,"germasoyeia":0.82,"totalAll":56.29},{"date":"1991-04-01","kouris":15.97,"asprokremmos":20.4,"evretou":5.71,"kannaviou":null,"germasoyeia":1.43,"totalAll":58.05},{"date":"1991-04-15","kouris":15.61,"asprokremmos":20.18,"evretou":5.63,"kannaviou":null,"germasoyeia":1.53,"totalAll":57.35},{"date":"1991-05-01","kouris":14.87,"asprokremmos":19.71,"evretou":5.48,"kannaviou":null,"germasoyeia":1.52,"totalAll":55.32},{"date":"1991-05-15","kouris":14.04,"asprokremmos":19.25,"evretou":5.34,"kannaviou":null,"germasoyeia":1.48,"totalAll":53.2},{"date":"1991-06-01","kouris":12.96,"asprokremmos":18.87,"evretou":5.13,"kannaviou":null,"germasoyeia":1.39,"totalAll":50.56},{"date":"1991-06-15","kouris":12.5,"asprokremmos":18.41,"evretou":4.86,"kannaviou":null,"germasoyeia":1.28,"totalAll":48.13},{"date":"1991-07-01","kouris":11.82,"asprokremmos":17.89,"evretou":4.28,"kannaviou":null,"germasoyeia":1.18,"totalAll":45.45},{"date":"1991-07-15","kouris":11.48,"asprokremmos":17.49,"evretou":3.96,"kannaviou":null,"germasoyeia":1.06,"totalAll":43.26},{"date":"1991-08-01","kouris":10.54,"asprokremmos":16.98,"evretou":3.63,"kannaviou":null,"germasoyeia":0.89,"totalAll":39.08},{"date":"1991-08-15","kouris":9.89,"asprokremmos":16.32,"evretou":3.27,"kannaviou":null,"germasoyeia":0.78,"totalAll":37.31},{"date":"1991-09-01","kouris":9.1,"asprokremmos":15.66,"evretou":2.86,"kannaviou":null,"germasoyeia":0.67,"totalAll":34.3},{"date":"1991-09-15","kouris":8.45,"asprokremmos":15.21,"evretou":2.59,"kannaviou":null,"germasoyeia":0.58,"totalAll":32.02},{"date":"1991-10-01","kouris":7.68,"asprokremmos":14.46,"evretou":2.32,"kannaviou":null,"germasoyeia":0.51,"totalAll":29.36},{"date":"1991-10-15","kouris":7.05,"asprokremmos":13.81,"evretou":2.14,"kannaviou":null,"germasoyeia":0.44,"totalAll":27.18},{"date":"1991-11-01","kouris":6.22,"asprokremmos":13.27,"evretou":1.95,"kannaviou":null,"germasoyeia":0.39,"totalAll":25.27},{"date":"1991-11-15","kouris":5.91,"asprokremmos":13.23,"evretou":1.91,"kannaviou":null,"germasoyeia":0.37,"totalAll":24.65},{"date":"1991-12-01","kouris":5.2,"asprokremmos":13.07,"evretou":1.86,"kannaviou":null,"germasoyeia":0.34,"totalAll":23.7},{"date":"1991-12-15","kouris":7.69,"asprokremmos":15.47,"evretou":2.66,"kannaviou":null,"germasoyeia":1.6,"totalAll":34.92},{"date":"1992-01-01","kouris":15.04,"asprokremmos":25.19,"evretou":5.21,"kannaviou":null,"germasoyeia":6.97,"totalAll":71.19},{"date":"1992-01-15","kouris":18.4,"asprokremmos":27.46,"evretou":6.45,"kannaviou":null,"germasoyeia":9.2,"totalAll":84.94},{"date":"1992-02-01","kouris":20.6,"asprokremmos":28.79,"evretou":6.92,"kannaviou":null,"germasoyeia":9.67,"totalAll":91.64},{"date":"1992-02-15","kouris":24.47,"asprokremmos":33.82,"evretou":8.56,"kannaviou":null,"germasoyeia":11.91,"totalAll":113.53},{"date":"1992-03-01","kouris":28.34,"asprokremmos":36.1,"evretou":9.61,"kannaviou":null,"germasoyeia":12.78,"totalAll":126.02},{"date":"1992-03-15","kouris":30.4,"asprokremmos":36.99,"evretou":10.19,"kannaviou":null,"germasoyeia":12.85,"totalAll":132.06},{"date":"1992-04-01","kouris":33.44,"asprokremmos":38.47,"evretou":11.01,"kannaviou":null,"germasoyeia":12.94,"totalAll":139.81},{"date":"1992-04-15","kouris":34.88,"asprokremmos":38.87,"evretou":11.23,"kannaviou":null,"germasoyeia":13.05,"totalAll":142.35},{"date":"1992-05-01","kouris":35.78,"asprokremmos":39.09,"evretou":11.4,"kannaviou":null,"germasoyeia":13.18,"totalAll":143.96},{"date":"1992-05-15","kouris":36.16,"asprokremmos":39.12,"evretou":11.37,"kannaviou":null,"germasoyeia":13.12,"totalAll":144.46},{"date":"1992-06-01","kouris":36.27,"asprokremmos":38.94,"evretou":11.24,"kannaviou":null,"germasoyeia":12.76,"totalAll":143.2},{"date":"1992-06-15","kouris":35.83,"asprokremmos":38.51,"evretou":11.0,"kannaviou":null,"germasoyeia":12.84,"totalAll":140.95},{"date":"1992-07-01","kouris":35.66,"asprokremmos":38.07,"evretou":10.6,"kannaviou":null,"germasoyeia":11.91,"totalAll":137.9},{"date":"1992-07-15","kouris":35.24,"asprokremmos":37.48,"evretou":10.21,"kannaviou":null,"germasoyeia":11.34,"totalAll":134.58},{"date":"1992-08-01","kouris":34.84,"asprokremmos":36.68,"evretou":9.81,"kannaviou":null,"germasoyeia":10.8,"totalAll":131.1},{"date":"1992-08-15","kouris":34.12,"asprokremmos":35.62,"evretou":9.45,"kannaviou":null,"germasoyeia":10,"totalAll":126.6},{"date":"1992-09-01","kouris":32.82,"asprokremmos":34.69,"evretou":9.06,"kannaviou":null,"germasoyeia":9.29,"totalAll":121.47},{"date":"1992-09-15","kouris":31.59,"asprokremmos":33.84,"evretou":8.77,"kannaviou":null,"germasoyeia":8.65,"totalAll":116.94},{"date":"1992-10-01","kouris":30.32,"asprokremmos":32.79,"evretou":8.45,"kannaviou":null,"germasoyeia":7.86,"totalAll":111.74},{"date":"1992-10-15","kouris":29.45,"asprokremmos":31.85,"evretou":8.26,"kannaviou":null,"germasoyeia":7.26,"totalAll":107.84},{"date":"1992-11-01","kouris":28.48,"asprokremmos":30.88,"evretou":8,"kannaviou":null,"germasoyeia":6.7,"totalAll":103.57},{"date":"1992-11-15","kouris":27.78,"asprokremmos":30.15,"evretou":7.79,"kannaviou":null,"germasoyeia":6.27,"totalAll":100.68},{"date":"1992-12-01","kouris":28.9,"asprokremmos":30.27,"evretou":7.71,"kannaviou":null,"germasoyeia":6.46,"totalAll":102.32},{"date":"1992-12-15","kouris":34.36,"asprokremmos":33.22,"evretou":8.37,"kannaviou":null,"germasoyeia":10.1,"totalAll":124.85},{"date":"1993-01-01","kouris":37.75,"asprokremmos":35.11,"evretou":9.29,"kannaviou":null,"germasoyeia":11.02,"totalAll":134.66},{"date":"1993-01-15","kouris":39.94,"asprokremmos":36.97,"evretou":9.88,"kannaviou":null,"germasoyeia":11.41,"totalAll":142.41},{"date":"1993-02-01","kouris":42.48,"asprokremmos":38.25,"evretou":10.45,"kannaviou":null,"germasoyeia":11.62,"totalAll":149.18},{"date":"1993-02-15","kouris":44.23,"asprokremmos":39.41,"evretou":10.99,"kannaviou":null,"germasoyeia":11.8,"totalAll":155.03},{"date":"1993-03-01","kouris":47.85,"asprokremmos":41.42,"evretou":11.45,"kannaviou":null,"germasoyeia":12.61,"totalAll":164.26},{"date":"1993-03-15","kouris":53.81,"asprokremmos":45.63,"evretou":12.98,"kannaviou":null,"germasoyeia":13.5,"totalAll":179.91},{"date":"1993-04-01","kouris":57.63,"asprokremmos":47.37,"evretou":13.73,"kannaviou":null,"germasoyeia":13.5,"totalAll":188.06},{"date":"1993-04-15","kouris":59.96,"asprokremmos":47.89,"evretou":13.87,"kannaviou":null,"germasoyeia":13.5,"totalAll":191.67},{"date":"1993-05-01","kouris":61.01,"asprokremmos":48,"evretou":13.82,"kannaviou":null,"germasoyeia":13.5,"totalAll":192.1},{"date":"1993-05-15","kouris":62.0,"asprokremmos":48.17,"evretou":13.7,"kannaviou":null,"germasoyeia":13.5,"totalAll":192.83},{"date":"1993-06-01","kouris":62.69,"asprokremmos":47.8,"evretou":13.43,"kannaviou":null,"germasoyeia":13.28,"totalAll":191.49},{"date":"1993-06-15","kouris":62.55,"asprokremmos":47.37,"evretou":13.07,"kannaviou":null,"germasoyeia":12.82,"totalAll":188.61},{"date":"1993-07-01","kouris":61.92,"asprokremmos":46.65,"evretou":12.65,"kannaviou":null,"germasoyeia":12.1,"totalAll":184.12},{"date":"1993-07-15","kouris":61.18,"asprokremmos":45.98,"evretou":12.21,"kannaviou":null,"germasoyeia":11.33,"totalAll":179.92},{"date":"1993-08-01","kouris":59.68,"asprokremmos":44.97,"evretou":11.73,"kannaviou":null,"germasoyeia":10.43,"totalAll":174.13},{"date":"1993-08-15","kouris":58.14,"asprokremmos":43.67,"evretou":11.28,"kannaviou":null,"germasoyeia":9.7,"totalAll":168.47},{"date":"1993-09-01","kouris":56.49,"asprokremmos":42.58,"evretou":10.89,"kannaviou":null,"germasoyeia":8.76,"totalAll":162.43},{"date":"1993-09-15","kouris":54.95,"asprokremmos":41.63,"evretou":10.57,"kannaviou":null,"germasoyeia":7.92,"totalAll":157.3},{"date":"1993-10-01","kouris":53.18,"asprokremmos":40.58,"evretou":10.28,"kannaviou":null,"germasoyeia":7.2,"totalAll":151.71},{"date":"1993-10-15","kouris":51.84,"asprokremmos":39.8,"evretou":10.06,"kannaviou":null,"germasoyeia":6.53,"totalAll":147.21},{"date":"1993-11-01","kouris":50.08,"asprokremmos":38.68,"evretou":9.79,"kannaviou":null,"germasoyeia":5.7,"totalAll":141.64},{"date":"1993-11-15","kouris":49.5,"asprokremmos":38.13,"evretou":9.64,"kannaviou":null,"germasoyeia":5.18,"totalAll":138.92},{"date":"1993-12-01","kouris":49.86,"asprokremmos":37.92,"evretou":9.51,"kannaviou":null,"germasoyeia":4.83,"totalAll":138.13},{"date":"1993-12-15","kouris":48.94,"asprokremmos":37.65,"evretou":9.42,"kannaviou":null,"germasoyeia":4.59,"totalAll":136.72},{"date":"1994-01-01","kouris":47.9,"asprokremmos":37.37,"evretou":9.32,"kannaviou":null,"germasoyeia":4.39,"totalAll":134.9},{"date":"1994-01-15","kouris":48.19,"asprokremmos":37.4,"evretou":9.24,"kannaviou":null,"germasoyeia":4.44,"totalAll":135.08},{"date":"1994-02-01","kouris":49.18,"asprokremmos":38.31,"evretou":9.58,"kannaviou":null,"germasoyeia":5.42,"totalAll":140.13},{"date":"1994-02-15","kouris":52.96,"asprokremmos":41.29,"evretou":10.96,"kannaviou":null,"germasoyeia":7.13,"totalAll":152.81},{"date":"1994-03-01","kouris":55.22,"asprokremmos":42.19,"evretou":11.68,"kannaviou":null,"germasoyeia":8.25,"totalAll":159.78},{"date":"1994-03-15","kouris":56.64,"asprokremmos":42.51,"evretou":11.86,"kannaviou":null,"germasoyeia":9.13,"totalAll":164.57},{"date":"1994-04-01","kouris":57.04,"asprokremmos":42.76,"evretou":11.9,"kannaviou":null,"germasoyeia":9.88,"totalAll":168.41},{"date":"1994-04-15","kouris":56.91,"asprokremmos":42.74,"evretou":11.81,"kannaviou":null,"germasoyeia":10.11,"totalAll":168.43},{"date":"1994-05-01","kouris":56.13,"asprokremmos":42.21,"evretou":11.61,"kannaviou":null,"germasoyeia":9.93,"totalAll":166.24},{"date":"1994-05-15","kouris":55.9,"asprokremmos":41.95,"evretou":11.39,"kannaviou":null,"germasoyeia":9.75,"totalAll":164.94},{"date":"1994-06-01","kouris":54.63,"asprokremmos":41.14,"evretou":11.05,"kannaviou":null,"germasoyeia":9.11,"totalAll":160.07},{"date":"1994-06-15","kouris":53.45,"asprokremmos":40.52,"evretou":10.69,"kannaviou":null,"germasoyeia":8.38,"totalAll":155.62},{"date":"1994-07-01","kouris":52.08,"asprokremmos":39.7,"evretou":10.21,"kannaviou":null,"germasoyeia":7.5,"totalAll":150.1},{"date":"1994-07-15","kouris":50.75,"asprokremmos":38.83,"evretou":9.77,"kannaviou":null,"germasoyeia":6.84,"totalAll":145.07},{"date":"1994-08-01","kouris":49.32,"asprokremmos":37.46,"evretou":9.29,"kannaviou":null,"germasoyeia":6.08,"totalAll":139.05},{"date":"1994-08-15","kouris":47.67,"asprokremmos":35.84,"evretou":8.83,"kannaviou":null,"germasoyeia":5.32,"totalAll":132.91},{"date":"1994-09-01","kouris":45.42,"asprokremmos":34.56,"evretou":8.41,"kannaviou":null,"germasoyeia":4.48,"totalAll":126.19},{"date":"1994-09-15","kouris":43.59,"asprokremmos":33.19,"evretou":8.05,"kannaviou":null,"germasoyeia":3.82,"totalAll":120.47},{"date":"1994-10-01","kouris":41.87,"asprokremmos":32.03,"evretou":7.82,"kannaviou":null,"germasoyeia":3.17,"totalAll":115.06},{"date":"1994-10-15","kouris":40.22,"asprokremmos":31.13,"evretou":7.59,"kannaviou":null,"germasoyeia":2.58,"totalAll":110.44},{"date":"1994-11-01","kouris":39.06,"asprokremmos":30.66,"evretou":7.47,"kannaviou":null,"germasoyeia":1.85,"totalAll":107.66},{"date":"1994-11-15","kouris":38.03,"asprokremmos":30.07,"evretou":7.3,"kannaviou":null,"germasoyeia":1.64,"totalAll":104.98},{"date":"1994-12-01","kouris":48.46,"asprokremmos":31.93,"evretou":8.19,"kannaviou":null,"germasoyeia":11.7,"totalAll":146.74},{"date":"1994-12-15","kouris":50.17,"asprokremmos":32.02,"evretou":8.32,"kannaviou":null,"germasoyeia":12.48,"totalAll":151.72},{"date":"1995-01-01","kouris":52.29,"asprokremmos":32.7,"evretou":8.86,"kannaviou":null,"germasoyeia":12.94,"totalAll":157.48},{"date":"1995-01-15","kouris":54.49,"asprokremmos":35.01,"evretou":9.6,"kannaviou":null,"germasoyeia":13.4,"totalAll":164.37},{"date":"1995-02-01","kouris":57.16,"asprokremmos":37.38,"evretou":10.85,"kannaviou":null,"germasoyeia":13.5,"totalAll":171.6},{"date":"1995-02-15","kouris":59.25,"asprokremmos":38.62,"evretou":11.43,"kannaviou":null,"germasoyeia":13.5,"totalAll":175.97},{"date":"1995-03-01","kouris":60.66,"asprokremmos":39.33,"evretou":11.83,"kannaviou":null,"germasoyeia":13.5,"totalAll":178.33},{"date":"1995-03-15","kouris":60.89,"asprokremmos":39.79,"evretou":12.03,"kannaviou":null,"germasoyeia":13.5,"totalAll":179.08},{"date":"1995-04-01","kouris":60.99,"asprokremmos":40.2,"evretou":12.18,"kannaviou":null,"germasoyeia":13.5,"totalAll":179.04},{"date":"1995-04-15","kouris":60.87,"asprokremmos":40.18,"evretou":12.13,"kannaviou":null,"germasoyeia":13.5,"totalAll":177.91},{"date":"1995-05-01","kouris":60.41,"asprokremmos":39.99,"evretou":12.0,"kannaviou":null,"germasoyeia":13.33,"totalAll":175.86},{"date":"1995-05-15","kouris":59.61,"asprokremmos":40,"evretou":11.98,"kannaviou":null,"germasoyeia":12.96,"totalAll":173.87},{"date":"1995-06-01","kouris":57.59,"asprokremmos":39.17,"evretou":11.68,"kannaviou":null,"germasoyeia":12.3,"totalAll":168.56},{"date":"1995-06-15","kouris":56.09,"asprokremmos":38.53,"evretou":11.34,"kannaviou":null,"germasoyeia":11.71,"totalAll":164.22},{"date":"1995-07-01","kouris":54.17,"asprokremmos":37.78,"evretou":10.87,"kannaviou":null,"germasoyeia":10.89,"totalAll":158.56},{"date":"1995-07-15","kouris":52.4,"asprokremmos":36.96,"evretou":10.4,"kannaviou":null,"germasoyeia":10.15,"totalAll":153.31},{"date":"1995-08-01","kouris":50.47,"asprokremmos":35.71,"evretou":9.84,"kannaviou":null,"germasoyeia":9.24,"totalAll":146.85},{"date":"1995-08-15","kouris":48.65,"asprokremmos":34.39,"evretou":9.5,"kannaviou":null,"germasoyeia":8.45,"totalAll":141.1},{"date":"1995-09-01","kouris":46.06,"asprokremmos":33.12,"evretou":9.06,"kannaviou":null,"germasoyeia":7.41,"totalAll":133.85},{"date":"1995-09-15","kouris":43.98,"asprokremmos":32.15,"evretou":8.73,"kannaviou":null,"germasoyeia":6.64,"totalAll":128.23},{"date":"1995-10-01","kouris":41.67,"asprokremmos":30.97,"evretou":8.39,"kannaviou":null,"germasoyeia":5.83,"totalAll":121.98},{"date":"1995-10-15","kouris":39.52,"asprokremmos":29.87,"evretou":8.2,"kannaviou":null,"germasoyeia":5.2,"totalAll":116.37},{"date":"1995-11-01","kouris":37.42,"asprokremmos":28.77,"evretou":7.98,"kannaviou":null,"germasoyeia":4.41,"totalAll":110.78},{"date":"1995-11-15","kouris":36.19,"asprokremmos":28.47,"evretou":7.88,"kannaviou":null,"germasoyeia":4.08,"totalAll":108.18},{"date":"1995-12-01","kouris":35.65,"asprokremmos":28.14,"evretou":7.77,"kannaviou":null,"germasoyeia":3.81,"totalAll":106.43},{"date":"1995-12-15","kouris":35.01,"asprokremmos":27.78,"evretou":7.71,"kannaviou":null,"germasoyeia":3.62,"totalAll":104.57},{"date":"1996-01-01","kouris":34.38,"asprokremmos":27.41,"evretou":7.5,"kannaviou":null,"germasoyeia":3.42,"totalAll":102.18},{"date":"1996-01-15","kouris":36.62,"asprokremmos":28.45,"evretou":7.62,"kannaviou":null,"germasoyeia":4.8,"totalAll":107.73},{"date":"1996-02-01","kouris":37.15,"asprokremmos":28.51,"evretou":7.65,"kannaviou":null,"germasoyeia":4.84,"totalAll":107.91},{"date":"1996-02-15","kouris":38.17,"asprokremmos":29.69,"evretou":7.86,"kannaviou":null,"germasoyeia":5.26,"totalAll":111.57},{"date":"1996-03-01","kouris":38.66,"asprokremmos":29.7,"evretou":7.97,"kannaviou":null,"germasoyeia":5.73,"totalAll":113.49},{"date":"1996-03-15","kouris":39.75,"asprokremmos":30.72,"evretou":8.57,"kannaviou":null,"germasoyeia":6.15,"totalAll":117.36},{"date":"1996-04-01","kouris":39.4,"asprokremmos":31.53,"evretou":8.92,"kannaviou":null,"germasoyeia":6.25,"totalAll":118.74},{"date":"1996-04-15","kouris":38.53,"asprokremmos":31.5,"evretou":8.96,"kannaviou":null,"germasoyeia":6.14,"totalAll":117.58},{"date":"1996-05-01","kouris":37.95,"asprokremmos":31.75,"evretou":9.05,"kannaviou":null,"germasoyeia":6.01,"totalAll":116.86},{"date":"1996-05-15","kouris":36.66,"asprokremmos":31.3,"evretou":8.87,"kannaviou":null,"germasoyeia":5.68,"totalAll":113.51},{"date":"1996-06-01","kouris":34.83,"asprokremmos":30.6,"evretou":8.53,"kannaviou":null,"germasoyeia":5.31,"totalAll":108.48},{"date":"1996-06-15","kouris":33.62,"asprokremmos":29.65,"evretou":8.17,"kannaviou":null,"germasoyeia":4.9,"totalAll":104.25},{"date":"1996-07-01","kouris":31.96,"asprokremmos":28.63,"evretou":7.67,"kannaviou":null,"germasoyeia":4.4,"totalAll":98.36},{"date":"1996-07-15","kouris":30.77,"asprokremmos":27.69,"evretou":7.29,"kannaviou":null,"germasoyeia":4.0,"totalAll":93.82},{"date":"1996-08-01","kouris":29.38,"asprokremmos":26.2,"evretou":6.82,"kannaviou":null,"germasoyeia":3.27,"totalAll":87.72},{"date":"1996-08-15","kouris":28.06,"asprokremmos":24.85,"evretou":6.4,"kannaviou":null,"germasoyeia":2.95,"totalAll":82.58},{"date":"1996-09-01","kouris":26.36,"asprokremmos":23.58,"evretou":5.93,"kannaviou":null,"germasoyeia":2.41,"totalAll":76.73},{"date":"1996-09-15","kouris":24.92,"asprokremmos":22.4,"evretou":5.54,"kannaviou":null,"germasoyeia":2.1,"totalAll":71.82},{"date":"1996-10-01","kouris":23.35,"asprokremmos":21.09,"evretou":5.2,"kannaviou":null,"germasoyeia":1.84,"totalAll":66.77},{"date":"1996-10-15","kouris":22.02,"asprokremmos":20.4,"evretou":5.0,"kannaviou":null,"germasoyeia":1.69,"totalAll":63.43},{"date":"1996-11-01","kouris":20.33,"asprokremmos":20.05,"evretou":4.84,"kannaviou":null,"germasoyeia":1.53,"totalAll":59.92},{"date":"1996-11-15","kouris":19.22,"asprokremmos":19.52,"evretou":4.7,"kannaviou":null,"germasoyeia":1.42,"totalAll":57.28},{"date":"1996-12-01","kouris":17.97,"asprokremmos":18.95,"evretou":4.54,"kannaviou":null,"germasoyeia":1.29,"totalAll":54.24},{"date":"1996-12-15","kouris":18.0,"asprokremmos":19.21,"evretou":4.58,"kannaviou":null,"germasoyeia":1.42,"totalAll":55.02},{"date":"1997-01-01","kouris":17.61,"asprokremmos":19.28,"evretou":4.57,"kannaviou":null,"germasoyeia":1.54,"totalAll":54.63},{"date":"1997-01-15","kouris":17.12,"asprokremmos":19.25,"evretou":4.53,"kannaviou":null,"germasoyeia":1.6,"totalAll":54.32},{"date":"1997-02-01","kouris":16.48,"asprokremmos":19.02,"evretou":4.46,"kannaviou":null,"germasoyeia":1.61,"totalAll":53.35},{"date":"1997-02-15","kouris":16.1,"asprokremmos":18.98,"evretou":4.43,"kannaviou":null,"germasoyeia":1.64,"totalAll":52.89},{"date":"1997-03-01","kouris":17.06,"asprokremmos":19.98,"evretou":4.59,"kannaviou":null,"germasoyeia":2.26,"totalAll":56.29},{"date":"1997-03-15","kouris":17.09,"asprokremmos":19.61,"evretou":4.6,"kannaviou":null,"germasoyeia":2.38,"totalAll":56.55},{"date":"1997-04-01","kouris":17.27,"asprokremmos":19.03,"evretou":4.6,"kannaviou":null,"germasoyeia":2.51,"totalAll":56.74},{"date":"1997-04-15","kouris":19.61,"asprokremmos":20.01,"evretou":4.94,"kannaviou":null,"germasoyeia":3.34,"totalAll":62.65},{"date":"1997-05-01","kouris":19.96,"asprokremmos":20.01,"evretou":4.97,"kannaviou":null,"germasoyeia":3.57,"totalAll":63.44},{"date":"1997-05-15","kouris":19.63,"asprokremmos":19.75,"evretou":4.92,"kannaviou":null,"germasoyeia":3.58,"totalAll":62.47},{"date":"1997-06-01","kouris":18.79,"asprokremmos":19.22,"evretou":4.75,"kannaviou":null,"germasoyeia":3.46,"totalAll":59.88},{"date":"1997-06-15","kouris":18.15,"asprokremmos":18.7,"evretou":4.59,"kannaviou":null,"germasoyeia":3.31,"totalAll":57.56},{"date":"1997-07-01","kouris":17.37,"asprokremmos":17.99,"evretou":4.38,"kannaviou":null,"germasoyeia":3.14,"totalAll":54.39},{"date":"1997-07-15","kouris":16.51,"asprokremmos":17.14,"evretou":4.14,"kannaviou":null,"germasoyeia":2.87,"totalAll":51.09},{"date":"1997-08-01","kouris":15.53,"asprokremmos":16.22,"evretou":3.85,"kannaviou":null,"germasoyeia":2.42,"totalAll":46.97},{"date":"1997-08-15","kouris":14.7,"asprokremmos":15.5,"evretou":3.62,"kannaviou":null,"germasoyeia":2.04,"totalAll":43.74},{"date":"1997-09-01","kouris":13.23,"asprokremmos":14.6,"evretou":3.38,"kannaviou":null,"germasoyeia":1.69,"totalAll":39.79},{"date":"1997-09-15","kouris":11.86,"asprokremmos":13.85,"evretou":3.2,"kannaviou":null,"germasoyeia":1.48,"totalAll":36.77},{"date":"1997-10-01","kouris":10.36,"asprokremmos":13.38,"evretou":3.07,"kannaviou":null,"germasoyeia":1.3,"totalAll":33.93},{"date":"1997-10-15","kouris":9.17,"asprokremmos":12.89,"evretou":2.98,"kannaviou":null,"germasoyeia":1.16,"totalAll":31.62},{"date":"1997-11-01","kouris":7.99,"asprokremmos":12.54,"evretou":2.9,"kannaviou":null,"germasoyeia":1.05,"totalAll":29.56},{"date":"1997-11-15","kouris":7.4,"asprokremmos":12.25,"evretou":2.82,"kannaviou":null,"germasoyeia":0.98,"totalAll":28.43},{"date":"1997-12-01","kouris":7.09,"asprokremmos":12.3,"evretou":2.8,"kannaviou":null,"germasoyeia":0.93,"totalAll":28.18},{"date":"1997-12-15","kouris":7.66,"asprokremmos":12.48,"evretou":2.8,"kannaviou":null,"germasoyeia":0.99,"totalAll":29.09},{"date":"1998-01-01","kouris":7.74,"asprokremmos":13.0,"evretou":2.84,"kannaviou":null,"germasoyeia":1.18,"totalAll":30.68},{"date":"1998-01-15","kouris":8.25,"asprokremmos":13.21,"evretou":2.91,"kannaviou":null,"germasoyeia":1.32,"totalAll":31.77},{"date":"1998-02-01","kouris":8.33,"asprokremmos":14,"evretou":3.11,"kannaviou":null,"germasoyeia":1.46,"totalAll":33.23},{"date":"1998-02-15","kouris":8.07,"asprokremmos":14.32,"evretou":3.24,"kannaviou":null,"germasoyeia":1.52,"totalAll":33.63},{"date":"1998-03-01","kouris":7.78,"asprokremmos":14.47,"evretou":3.33,"kannaviou":null,"germasoyeia":1.55,"totalAll":33.58},{"date":"1998-03-15","kouris":9.46,"asprokremmos":14.47,"evretou":3.34,"kannaviou":null,"germasoyeia":1.57,"totalAll":35.3},{"date":"1998-04-01","kouris":10.46,"asprokremmos":16.31,"evretou":4.1,"kannaviou":null,"germasoyeia":1.88,"totalAll":40.11},{"date":"1998-04-15","kouris":10.24,"asprokremmos":16.83,"evretou":4.64,"kannaviou":null,"germasoyeia":1.91,"totalAll":41.12},{"date":"1998-05-01","kouris":10.01,"asprokremmos":16.77,"evretou":4.73,"kannaviou":null,"germasoyeia":1.87,"totalAll":40.53},{"date":"1998-05-15","kouris":9.5,"asprokremmos":16.38,"evretou":4.7,"kannaviou":null,"germasoyeia":1.8,"totalAll":39.24},{"date":"1998-06-01","kouris":9.29,"asprokremmos":15.9,"evretou":4.6,"kannaviou":null,"germasoyeia":1.7,"totalAll":38.0},{"date":"1998-06-15","kouris":8.38,"asprokremmos":15.43,"evretou":4.46,"kannaviou":null,"germasoyeia":1.56,"totalAll":35.98},{"date":"1998-07-01","kouris":7.56,"asprokremmos":14.86,"evretou":4.26,"kannaviou":null,"germasoyeia":1.42,"totalAll":33.71},{"date":"1998-07-15","kouris":6.6,"asprokremmos":14.1,"evretou":4.07,"kannaviou":null,"germasoyeia":1.27,"totalAll":31.05},{"date":"1998-08-01","kouris":6.54,"asprokremmos":13.34,"evretou":3.83,"kannaviou":null,"germasoyeia":1.04,"totalAll":29.21},{"date":"1998-08-15","kouris":5.78,"asprokremmos":12.4,"evretou":3.65,"kannaviou":null,"germasoyeia":0.8,"totalAll":26.58},{"date":"1998-09-01","kouris":4.94,"asprokremmos":11.44,"evretou":3.4,"kannaviou":null,"germasoyeia":0.58,"totalAll":23.61},{"date":"1998-09-15","kouris":4.27,"asprokremmos":10.74,"evretou":3.21,"kannaviou":null,"germasoyeia":0.43,"totalAll":21.18},{"date":"1998-10-01","kouris":3.55,"asprokremmos":9.95,"evretou":3.04,"kannaviou":null,"germasoyeia":0.35,"totalAll":18.93},{"date":"1998-10-15","kouris":2.77,"asprokremmos":9.31,"evretou":2.91,"kannaviou":null,"germasoyeia":0.27,"totalAll":17.11},{"date":"1998-11-01","kouris":1.86,"asprokremmos":8.68,"evretou":2.79,"kannaviou":null,"germasoyeia":0.04,"totalAll":15.03},{"date":"1998-11-15","kouris":1.46,"asprokremmos":8.3,"evretou":2.73,"kannaviou":null,"germasoyeia":0.03,"totalAll":14.19},{"date":"1998-12-01","kouris":1.59,"asprokremmos":8.14,"evretou":2.7,"kannaviou":null,"germasoyeia":0.03,"totalAll":14.21},{"date":"1998-12-15","kouris":2.77,"asprokremmos":8.21,"evretou":2.67,"kannaviou":null,"germasoyeia":0.03,"totalAll":15.36},{"date":"1999-01-01","kouris":5.98,"asprokremmos":10.95,"evretou":3.78,"kannaviou":null,"germasoyeia":0.42,"totalAll":24.87},{"date":"1999-01-15","kouris":6.94,"asprokremmos":11.12,"evretou":4.06,"kannaviou":null,"germasoyeia":0.66,"totalAll":27.44},{"date":"1999-02-01","kouris":7.91,"asprokremmos":13.27,"evretou":5.2,"kannaviou":null,"germasoyeia":0.96,"totalAll":34.75},{"date":"1999-02-15","kouris":12.71,"asprokremmos":18,"evretou":6.77,"kannaviou":null,"germasoyeia":2.9,"totalAll":51.9},{"date":"1999-03-01","kouris":16.57,"asprokremmos":19.58,"evretou":7.44,"kannaviou":null,"germasoyeia":3.38,"totalAll":58.65},{"date":"1999-03-15","kouris":17.8,"asprokremmos":20.12,"evretou":7.68,"kannaviou":null,"germasoyeia":3.55,"totalAll":61.77},{"date":"1999-04-01","kouris":19.32,"asprokremmos":20.86,"evretou":8.01,"kannaviou":null,"germasoyeia":3.79,"totalAll":65.29},{"date":"1999-04-15","kouris":20.71,"asprokremmos":22.35,"evretou":8.88,"kannaviou":null,"germasoyeia":3.96,"totalAll":70.29},{"date":"1999-05-01","kouris":20.93,"asprokremmos":22.41,"evretou":9.18,"kannaviou":null,"germasoyeia":3.93,"totalAll":70.92},{"date":"1999-05-15","kouris":20.1,"asprokremmos":22.03,"evretou":9.1,"kannaviou":null,"germasoyeia":3.82,"totalAll":69.39},{"date":"1999-06-01","kouris":19.18,"asprokremmos":21.35,"evretou":8.87,"kannaviou":null,"germasoyeia":3.66,"totalAll":66.59},{"date":"1999-06-15","kouris":18.84,"asprokremmos":20.74,"evretou":8.63,"kannaviou":null,"germasoyeia":3.52,"totalAll":64.35},{"date":"1999-07-01","kouris":18.17,"asprokremmos":19.95,"evretou":8.37,"kannaviou":null,"germasoyeia":3.4,"totalAll":62.01},{"date":"1999-07-15","kouris":17.17,"asprokremmos":19.0,"evretou":8.04,"kannaviou":null,"germasoyeia":3.18,"totalAll":58.69},{"date":"1999-08-01","kouris":15.72,"asprokremmos":17.71,"evretou":7.64,"kannaviou":null,"germasoyeia":2.87,"totalAll":53.55},{"date":"1999-08-15","kouris":14.46,"asprokremmos":16.7,"evretou":7.28,"kannaviou":null,"germasoyeia":2.65,"totalAll":49.56},{"date":"1999-09-01","kouris":13.01,"asprokremmos":15.5,"evretou":6.93,"kannaviou":null,"germasoyeia":2.33,"totalAll":45.56},{"date":"1999-09-15","kouris":11.77,"asprokremmos":14.55,"evretou":6.61,"kannaviou":null,"germasoyeia":2.17,"totalAll":42.46},{"date":"1999-10-01","kouris":10.9,"asprokremmos":13.57,"evretou":6.3,"kannaviou":null,"germasoyeia":1.96,"totalAll":38.73},{"date":"1999-10-15","kouris":10.9,"asprokremmos":12.89,"evretou":6.1,"kannaviou":null,"germasoyeia":1.75,"totalAll":36.23},{"date":"1999-11-01","kouris":10.49,"asprokremmos":12.15,"evretou":5.86,"kannaviou":null,"germasoyeia":1.55,"totalAll":33.94},{"date":"1999-11-15","kouris":9.68,"asprokremmos":11.68,"evretou":5.74,"kannaviou":null,"germasoyeia":1.41,"totalAll":32.34},{"date":"1999-12-01","kouris":8.78,"asprokremmos":11.16,"evretou":5.62,"kannaviou":null,"germasoyeia":1.27,"totalAll":30.45},{"date":"1999-12-15","kouris":8.32,"asprokremmos":10.81,"evretou":5.55,"kannaviou":null,"germasoyeia":1.18,"totalAll":29.43},{"date":"2000-01-01","kouris":7.4,"asprokremmos":10.61,"evretou":5.51,"kannaviou":null,"germasoyeia":1.1,"totalAll":28.53},{"date":"2000-01-15","kouris":7.17,"asprokremmos":10.5,"evretou":5.47,"kannaviou":null,"germasoyeia":1.04,"totalAll":28.46},{"date":"2000-02-01","kouris":7.37,"asprokremmos":10.88,"evretou":5.5,"kannaviou":null,"germasoyeia":0.99,"totalAll":30.59},{"date":"2000-02-15","kouris":7.34,"asprokremmos":10.84,"evretou":5.61,"kannaviou":null,"germasoyeia":0.99,"totalAll":31.53},{"date":"2000-03-01","kouris":8.4,"asprokremmos":12.19,"evretou":5.87,"kannaviou":null,"germasoyeia":1.08,"totalAll":35.8},{"date":"2000-03-15","kouris":10.21,"asprokremmos":13.16,"evretou":6.25,"kannaviou":null,"germasoyeia":1.14,"totalAll":39.58},{"date":"2000-04-01","kouris":12.43,"asprokremmos":13.39,"evretou":6.47,"kannaviou":null,"germasoyeia":1.32,"totalAll":42.28},{"date":"2000-04-15","kouris":12.66,"asprokremmos":12.94,"evretou":6.5,"kannaviou":null,"germasoyeia":1.37,"totalAll":42.64},{"date":"2000-05-01","kouris":16.6,"asprokremmos":14.6,"evretou":6.87,"kannaviou":null,"germasoyeia":1.94,"totalAll":49.72},{"date":"2000-05-15","kouris":17.32,"asprokremmos":14.57,"evretou":6.98,"kannaviou":null,"germasoyeia":1.98,"totalAll":51.18},{"date":"2000-06-01","kouris":17.18,"asprokremmos":14.05,"evretou":6.86,"kannaviou":null,"germasoyeia":1.89,"totalAll":50.32},{"date":"2000-06-15","kouris":16.49,"asprokremmos":13.46,"evretou":6.66,"kannaviou":null,"germasoyeia":1.74,"totalAll":48.29},{"date":"2000-07-01","kouris":15.35,"asprokremmos":12.72,"evretou":6.34,"kannaviou":null,"germasoyeia":1.51,"totalAll":45.29},{"date":"2000-07-15","kouris":14.3,"asprokremmos":12.01,"evretou":6.04,"kannaviou":null,"germasoyeia":1.39,"totalAll":42.04},{"date":"2000-08-01","kouris":12.88,"asprokremmos":11.01,"evretou":5.68,"kannaviou":null,"germasoyeia":1.18,"totalAll":38.34},{"date":"2000-08-15","kouris":11.7,"asprokremmos":10.23,"evretou":5.36,"kannaviou":null,"germasoyeia":1.0,"totalAll":34.96},{"date":"2000-09-01","kouris":10.04,"asprokremmos":9.29,"evretou":4.99,"kannaviou":null,"germasoyeia":0.8,"totalAll":30.82},{"date":"2000-09-15","kouris":8.88,"asprokremmos":8.47,"evretou":4.69,"kannaviou":null,"germasoyeia":0.64,"totalAll":27.41},{"date":"2000-10-01","kouris":7.56,"asprokremmos":7.8,"evretou":4.46,"kannaviou":null,"germasoyeia":0.46,"totalAll":24.9},{"date":"2000-10-15","kouris":6.4,"asprokremmos":7.18,"evretou":4.31,"kannaviou":null,"germasoyeia":0.35,"totalAll":22.18},{"date":"2000-11-01","kouris":5.21,"asprokremmos":6.48,"evretou":4.18,"kannaviou":null,"germasoyeia":0.26,"totalAll":19.63},{"date":"2000-11-15","kouris":4.51,"asprokremmos":5.94,"evretou":4.06,"kannaviou":null,"germasoyeia":0.19,"totalAll":18.46},{"date":"2000-12-01","kouris":4.85,"asprokremmos":5.8,"evretou":4.0,"kannaviou":null,"germasoyeia":0.49,"totalAll":19.78},{"date":"2000-12-15","kouris":5.83,"asprokremmos":5.64,"evretou":3.96,"kannaviou":null,"germasoyeia":0.6,"totalAll":22.05},{"date":"2001-01-01","kouris":7.2,"asprokremmos":5.95,"evretou":4.02,"kannaviou":null,"germasoyeia":1.14,"totalAll":26.39},{"date":"2001-01-15","kouris":9.28,"asprokremmos":6.86,"evretou":4.3,"kannaviou":null,"germasoyeia":2.16,"totalAll":34.78},{"date":"2001-02-01","kouris":10.48,"asprokremmos":6.92,"evretou":4.39,"kannaviou":null,"germasoyeia":3.22,"totalAll":40.71},{"date":"2001-02-15","kouris":10.74,"asprokremmos":7.21,"evretou":4.53,"kannaviou":null,"germasoyeia":3.59,"totalAll":43.75},{"date":"2001-03-01","kouris":14.34,"asprokremmos":10.87,"evretou":5.52,"kannaviou":null,"germasoyeia":4.53,"totalAll":56.57},{"date":"2001-03-15","kouris":15.59,"asprokremmos":11.36,"evretou":5.76,"kannaviou":null,"germasoyeia":5.02,"totalAll":60.44},{"date":"2001-04-01","kouris":15.34,"asprokremmos":11.43,"evretou":5.79,"kannaviou":null,"germasoyeia":5.17,"totalAll":60.48},{"date":"2001-04-15","kouris":15.35,"asprokremmos":11.51,"evretou":5.78,"kannaviou":null,"germasoyeia":5.27,"totalAll":61.09},{"date":"2001-05-01","kouris":15.06,"asprokremmos":11.56,"evretou":5.74,"kannaviou":null,"germasoyeia":5.24,"totalAll":60.55},{"date":"2001-05-15","kouris":14.78,"asprokremmos":11.38,"evretou":5.51,"kannaviou":null,"germasoyeia":5.18,"totalAll":59.1},{"date":"2001-06-01","kouris":14.2,"asprokremmos":11.01,"evretou":5.39,"kannaviou":null,"germasoyeia":4.95,"totalAll":55.94},{"date":"2001-06-15","kouris":13.56,"asprokremmos":10.66,"evretou":5.17,"kannaviou":null,"germasoyeia":4.69,"totalAll":53.09},{"date":"2001-07-01","kouris":12.68,"asprokremmos":10.13,"evretou":4.84,"kannaviou":null,"germasoyeia":4.36,"totalAll":49.07},{"date":"2001-07-15","kouris":11.97,"asprokremmos":9.44,"evretou":4.53,"kannaviou":null,"germasoyeia":4.05,"totalAll":45.02},{"date":"2001-08-01","kouris":10.98,"asprokremmos":8.38,"evretou":4.11,"kannaviou":null,"germasoyeia":3.59,"totalAll":39.62},{"date":"2001-08-15","kouris":10.27,"asprokremmos":7.67,"evretou":3.83,"kannaviou":null,"germasoyeia":3.28,"totalAll":36.5},{"date":"2001-09-01","kouris":9.23,"asprokremmos":6.58,"evretou":3.46,"kannaviou":null,"germasoyeia":2.83,"totalAll":32.33},{"date":"2001-09-15","kouris":8.4,"asprokremmos":5.63,"evretou":3.18,"kannaviou":null,"germasoyeia":2.49,"totalAll":28.98},{"date":"2001-10-01","kouris":7.52,"asprokremmos":4.59,"evretou":2.91,"kannaviou":null,"germasoyeia":2.1,"totalAll":25.02},{"date":"2001-10-15","kouris":6.81,"asprokremmos":3.7,"evretou":2.58,"kannaviou":null,"germasoyeia":1.78,"totalAll":21.76},{"date":"2001-11-01","kouris":6.13,"asprokremmos":2.98,"evretou":2.48,"kannaviou":null,"germasoyeia":1.47,"totalAll":19.36},{"date":"2001-11-15","kouris":5.75,"asprokremmos":2.81,"evretou":2.45,"kannaviou":null,"germasoyeia":1.21,"totalAll":17.69},{"date":"2001-12-01","kouris":5.42,"asprokremmos":2.72,"evretou":2.41,"kannaviou":null,"germasoyeia":0.91,"totalAll":16.69},{"date":"2001-12-15","kouris":18.44,"asprokremmos":8.34,"evretou":4.22,"kannaviou":null,"germasoyeia":5.04,"totalAll":54.7},{"date":"2002-01-01","kouris":25.51,"asprokremmos":10.73,"evretou":5.09,"kannaviou":null,"germasoyeia":6.34,"totalAll":67.89},{"date":"2002-01-15","kouris":40.29,"asprokremmos":19.54,"evretou":7.26,"kannaviou":null,"germasoyeia":9.06,"totalAll":105.29},{"date":"2002-02-01","kouris":48.23,"asprokremmos":22.02,"evretou":8.1,"kannaviou":null,"germasoyeia":11.11,"totalAll":122.53},{"date":"2002-02-15","kouris":51.23,"asprokremmos":23.61,"evretou":8.49,"kannaviou":null,"germasoyeia":11.49,"totalAll":130.78},{"date":"2002-03-01","kouris":55.56,"asprokremmos":25.1,"evretou":9.07,"kannaviou":null,"germasoyeia":11.77,"totalAll":139.0},{"date":"2002-03-15","kouris":58.4,"asprokremmos":25.9,"evretou":9.42,"kannaviou":null,"germasoyeia":11.84,"totalAll":143.52},{"date":"2002-04-01","kouris":61.67,"asprokremmos":27.3,"evretou":9.86,"kannaviou":null,"germasoyeia":11.85,"totalAll":148.71},{"date":"2002-04-15","kouris":65.91,"asprokremmos":30.88,"evretou":11.12,"kannaviou":null,"germasoyeia":11.83,"totalAll":158.14},{"date":"2002-05-01","kouris":67.94,"asprokremmos":31.8,"evretou":11.45,"kannaviou":null,"germasoyeia":11.7,"totalAll":161.56},{"date":"2002-05-15","kouris":67.79,"asprokremmos":32.17,"evretou":11.38,"kannaviou":null,"germasoyeia":11.51,"totalAll":161.71},{"date":"2002-06-01","kouris":67.52,"asprokremmos":32.17,"evretou":11.19,"kannaviou":null,"germasoyeia":11.5,"totalAll":160.25},{"date":"2002-06-15","kouris":66.43,"asprokremmos":31.84,"evretou":10.91,"kannaviou":null,"germasoyeia":11.25,"totalAll":157.43},{"date":"2002-07-01","kouris":64.43,"asprokremmos":31.06,"evretou":10.47,"kannaviou":null,"germasoyeia":10.82,"totalAll":152.33},{"date":"2002-07-15","kouris":63.06,"asprokremmos":30.25,"evretou":10.09,"kannaviou":null,"germasoyeia":10.45,"totalAll":148.12},{"date":"2002-08-01","kouris":60.86,"asprokremmos":29.09,"evretou":9.55,"kannaviou":null,"germasoyeia":9.83,"totalAll":141.8},{"date":"2002-08-15","kouris":58.42,"asprokremmos":28.0,"evretou":9.21,"kannaviou":null,"germasoyeia":9.3,"totalAll":135.79},{"date":"2002-09-01","kouris":55.91,"asprokremmos":26.52,"evretou":8.7,"kannaviou":null,"germasoyeia":8.57,"totalAll":128.09},{"date":"2002-09-15","kouris":53.67,"asprokremmos":25.57,"evretou":8.33,"kannaviou":null,"germasoyeia":8.05,"totalAll":122.38},{"date":"2002-10-01","kouris":51.51,"asprokremmos":24.58,"evretou":7.9,"kannaviou":null,"germasoyeia":7.49,"totalAll":116.6},{"date":"2002-10-15","kouris":49.71,"asprokremmos":23.99,"evretou":7.67,"kannaviou":null,"germasoyeia":7.08,"totalAll":112.49},{"date":"2002-11-01","kouris":47.98,"asprokremmos":23.38,"evretou":7.43,"kannaviou":null,"germasoyeia":6.67,"totalAll":108.58},{"date":"2002-11-15","kouris":46.8,"asprokremmos":22.93,"evretou":7.22,"kannaviou":null,"germasoyeia":6.24,"totalAll":105.81},{"date":"2002-12-01","kouris":45.68,"asprokremmos":22.57,"evretou":7.12,"kannaviou":null,"germasoyeia":5.92,"totalAll":103.64},{"date":"2002-12-15","kouris":45.88,"asprokremmos":22.59,"evretou":7.1,"kannaviou":null,"germasoyeia":5.89,"totalAll":104.13},{"date":"2003-01-01","kouris":49.71,"asprokremmos":24.07,"evretou":8.01,"kannaviou":null,"germasoyeia":6.68,"totalAll":112.38},{"date":"2003-01-15","kouris":51.7,"asprokremmos":24.95,"evretou":8.59,"kannaviou":null,"germasoyeia":6.82,"totalAll":117.12},{"date":"2003-02-01","kouris":52.71,"asprokremmos":25.26,"evretou":8.8,"kannaviou":null,"germasoyeia":7.0,"totalAll":120.97},{"date":"2003-02-15","kouris":56.86,"asprokremmos":28.53,"evretou":9.96,"kannaviou":null,"germasoyeia":8.96,"totalAll":140.8},{"date":"2003-03-01","kouris":65.61,"asprokremmos":35.09,"evretou":12.78,"kannaviou":null,"germasoyeia":10.44,"totalAll":163.68},{"date":"2003-03-15","kouris":71.56,"asprokremmos":38.19,"evretou":14.01,"kannaviou":null,"germasoyeia":11.7,"totalAll":180.15},{"date":"2003-04-01","kouris":81.43,"asprokremmos":42.53,"evretou":15.6,"kannaviou":null,"germasoyeia":13.5,"totalAll":203.72},{"date":"2003-04-15","kouris":86.99,"asprokremmos":43.71,"evretou":16.12,"kannaviou":null,"germasoyeia":13.5,"totalAll":212.71},{"date":"2003-05-01","kouris":89.17,"asprokremmos":44.63,"evretou":16.36,"kannaviou":null,"germasoyeia":13.49,"totalAll":218.36},{"date":"2003-05-15","kouris":88.81,"asprokremmos":44.51,"evretou":16.23,"kannaviou":null,"germasoyeia":13.11,"totalAll":217.33},{"date":"2003-06-01","kouris":87.18,"asprokremmos":43.98,"evretou":15.83,"kannaviou":null,"germasoyeia":12.84,"totalAll":213.61},{"date":"2003-06-15","kouris":85.88,"asprokremmos":43.6,"evretou":15.36,"kannaviou":null,"germasoyeia":12.62,"totalAll":210.45},{"date":"2003-07-01","kouris":83.47,"asprokremmos":42.93,"evretou":15.04,"kannaviou":null,"germasoyeia":12.33,"totalAll":205.56},{"date":"2003-07-15","kouris":81.03,"asprokremmos":41.84,"evretou":14.55,"kannaviou":null,"germasoyeia":11.89,"totalAll":199.85},{"date":"2003-08-01","kouris":77.78,"asprokremmos":40.48,"evretou":13.93,"kannaviou":null,"germasoyeia":11.22,"totalAll":191.96},{"date":"2003-08-15","kouris":75.05,"asprokremmos":39.22,"evretou":13.54,"kannaviou":null,"germasoyeia":10.63,"totalAll":185.37},{"date":"2003-09-01","kouris":71.66,"asprokremmos":37.66,"evretou":12.99,"kannaviou":null,"germasoyeia":9.92,"totalAll":176.96},{"date":"2003-09-15","kouris":68.81,"asprokremmos":36.44,"evretou":12.57,"kannaviou":null,"germasoyeia":9.39,"totalAll":170.47},{"date":"2003-10-01","kouris":65.59,"asprokremmos":35.38,"evretou":12.11,"kannaviou":null,"germasoyeia":8.82,"totalAll":163.38},{"date":"2003-10-15","kouris":63.48,"asprokremmos":34.78,"evretou":11.81,"kannaviou":null,"germasoyeia":8.38,"totalAll":159.1},{"date":"2003-11-01","kouris":60.63,"asprokremmos":34.01,"evretou":11.5,"kannaviou":null,"germasoyeia":7.84,"totalAll":153.79},{"date":"2003-11-15","kouris":59.06,"asprokremmos":33.69,"evretou":11.36,"kannaviou":null,"germasoyeia":7.48,"totalAll":151.15},{"date":"2003-12-01","kouris":58.89,"asprokremmos":33.16,"evretou":11.15,"kannaviou":null,"germasoyeia":7.02,"totalAll":148.48},{"date":"2003-12-15","kouris":58.33,"asprokremmos":33.09,"evretou":11.16,"kannaviou":null,"germasoyeia":6.77,"totalAll":147.03},{"date":"2004-01-01","kouris":59.74,"asprokremmos":33.42,"evretou":11.12,"kannaviou":null,"germasoyeia":6.93,"totalAll":150.73},{"date":"2004-01-15","kouris":72.2,"asprokremmos":41.01,"evretou":13.88,"kannaviou":null,"germasoyeia":10.71,"totalAll":189.1},{"date":"2004-02-01","kouris":91.74,"asprokremmos":52.38,"evretou":18.14,"kannaviou":null,"germasoyeia":13.5,"totalAll":237.27},{"date":"2004-02-15","kouris":102.11,"asprokremmos":52.38,"evretou":19.73,"kannaviou":null,"germasoyeia":13.5,"totalAll":253.37},{"date":"2004-03-04","kouris":114.85,"asprokremmos":52.38,"evretou":21.57,"kannaviou":null,"germasoyeia":13.5,"totalAll":269.06},{"date":"2004-03-15","kouris":115,"asprokremmos":52.38,"evretou":22.04,"kannaviou":null,"germasoyeia":13.5,"totalAll":270.0},{"date":"2004-04-01","kouris":115,"asprokremmos":52.38,"evretou":22.13,"kannaviou":null,"germasoyeia":13.5,"totalAll":269.43},{"date":"2004-04-15","kouris":115,"asprokremmos":52.1,"evretou":22.0,"kannaviou":null,"germasoyeia":13.5,"totalAll":267.32},{"date":"2004-05-01","kouris":114.5,"asprokremmos":51.86,"evretou":21.72,"kannaviou":null,"germasoyeia":13.49,"totalAll":265.89},{"date":"2004-05-15","kouris":113.41,"asprokremmos":51.36,"evretou":21.37,"kannaviou":null,"germasoyeia":13.42,"totalAll":262.98},{"date":"2004-06-01","kouris":111.6,"asprokremmos":50.59,"evretou":20.82,"kannaviou":null,"germasoyeia":13.08,"totalAll":257.62},{"date":"2004-06-15","kouris":109.78,"asprokremmos":49.96,"evretou":20.42,"kannaviou":null,"germasoyeia":12.79,"totalAll":253.22},{"date":"2004-07-01","kouris":107.7,"asprokremmos":48.96,"evretou":19.81,"kannaviou":null,"germasoyeia":12.31,"totalAll":246.98},{"date":"2004-07-15","kouris":105.04,"asprokremmos":47.9,"evretou":19.21,"kannaviou":null,"germasoyeia":11.85,"totalAll":240.64},{"date":"2004-08-01","kouris":101.65,"asprokremmos":46.62,"evretou":18.65,"kannaviou":null,"germasoyeia":11.34,"totalAll":232.89},{"date":"2004-08-15","kouris":98.85,"asprokremmos":45.06,"evretou":18.0,"kannaviou":null,"germasoyeia":10.64,"totalAll":225.3},{"date":"2004-09-01","kouris":95.3,"asprokremmos":43.63,"evretou":17.42,"kannaviou":null,"germasoyeia":9.92,"totalAll":217.15},{"date":"2004-09-15","kouris":92.49,"asprokremmos":42.45,"evretou":16.85,"kannaviou":null,"germasoyeia":9.34,"totalAll":210.37},{"date":"2004-10-01","kouris":89.54,"asprokremmos":41.26,"evretou":16.38,"kannaviou":null,"germasoyeia":8.74,"totalAll":202.98},{"date":"2004-10-15","kouris":87.04,"asprokremmos":40.24,"evretou":15.94,"kannaviou":null,"germasoyeia":8.18,"totalAll":196.75},{"date":"2004-11-01","kouris":84.75,"asprokremmos":39.53,"evretou":15.65,"kannaviou":null,"germasoyeia":7.73,"totalAll":191.31},{"date":"2004-11-15","kouris":83.07,"asprokremmos":39.01,"evretou":15.36,"kannaviou":null,"germasoyeia":7.46,"totalAll":188.22},{"date":"2004-12-01","kouris":83.61,"asprokremmos":38.8,"evretou":15.22,"kannaviou":null,"germasoyeia":7.33,"totalAll":188.1},{"date":"2004-12-15","kouris":82.72,"asprokremmos":38.66,"evretou":15.04,"kannaviou":null,"germasoyeia":7.12,"totalAll":187.51},{"date":"2005-01-01","kouris":83.56,"asprokremmos":38.54,"evretou":14.95,"kannaviou":null,"germasoyeia":7.41,"totalAll":189.16},{"date":"2005-01-15","kouris":83.58,"asprokremmos":38.64,"evretou":14.88,"kannaviou":null,"germasoyeia":7.38,"totalAll":189.57},{"date":"2005-02-01","kouris":87.82,"asprokremmos":39.34,"evretou":14.96,"kannaviou":null,"germasoyeia":8.54,"totalAll":196.9},{"date":"2005-02-15","kouris":92.61,"asprokremmos":41.73,"evretou":15.85,"kannaviou":null,"germasoyeia":9.75,"totalAll":208.48},{"date":"2005-03-01","kouris":94.18,"asprokremmos":42.04,"evretou":15.87,"kannaviou":null,"germasoyeia":9.99,"totalAll":211.07},{"date":"2005-03-15","kouris":95.06,"asprokremmos":42.54,"evretou":16.01,"kannaviou":null,"germasoyeia":10.17,"totalAll":213.17},{"date":"2005-04-01","kouris":96.03,"asprokremmos":42.82,"evretou":16.01,"kannaviou":null,"germasoyeia":10.14,"totalAll":212.77},{"date":"2005-04-15","kouris":96.06,"asprokremmos":43.35,"evretou":16.06,"kannaviou":null,"germasoyeia":10.11,"totalAll":213.29},{"date":"2005-05-01","kouris":94.77,"asprokremmos":42.91,"evretou":15.93,"kannaviou":null,"germasoyeia":9.79,"totalAll":209.46},{"date":"2005-05-15","kouris":93.22,"asprokremmos":42.42,"evretou":15.7,"kannaviou":null,"germasoyeia":9.57,"totalAll":205.88},{"date":"2005-06-01","kouris":91.0,"asprokremmos":41.63,"evretou":15.33,"kannaviou":null,"germasoyeia":9.1,"totalAll":200.28},{"date":"2005-06-15","kouris":89.63,"asprokremmos":40.81,"evretou":15,"kannaviou":null,"germasoyeia":8.71,"totalAll":196.34},{"date":"2005-07-01","kouris":86.54,"asprokremmos":39.74,"evretou":14.58,"kannaviou":null,"germasoyeia":8.12,"totalAll":189.29},{"date":"2005-07-15","kouris":83.58,"asprokremmos":38.8,"evretou":14.15,"kannaviou":null,"germasoyeia":7.57,"totalAll":183.21},{"date":"2005-08-01","kouris":79.92,"asprokremmos":37.52,"evretou":13.56,"kannaviou":null,"germasoyeia":6.91,"totalAll":175.3},{"date":"2005-08-15","kouris":76.96,"asprokremmos":36.47,"evretou":13.14,"kannaviou":null,"germasoyeia":6.37,"totalAll":168.94},{"date":"2005-09-01","kouris":73.22,"asprokremmos":35.14,"evretou":12.55,"kannaviou":null,"germasoyeia":5.74,"totalAll":160.57},{"date":"2005-09-15","kouris":70.15,"asprokremmos":34.03,"evretou":12.05,"kannaviou":null,"germasoyeia":5.18,"totalAll":153.84},{"date":"2005-10-01","kouris":67.13,"asprokremmos":32.95,"evretou":11.49,"kannaviou":null,"germasoyeia":4.69,"totalAll":147.16},{"date":"2005-10-15","kouris":64.37,"asprokremmos":32.13,"evretou":11.11,"kannaviou":null,"germasoyeia":4.47,"totalAll":141.69},{"date":"2005-11-01","kouris":61.36,"asprokremmos":31.34,"evretou":10.73,"kannaviou":null,"germasoyeia":4.05,"totalAll":136.09},{"date":"2005-11-15","kouris":59.8,"asprokremmos":31.03,"evretou":10.65,"kannaviou":null,"germasoyeia":3.59,"totalAll":134.14},{"date":"2005-12-01","kouris":58.12,"asprokremmos":30.71,"evretou":10.57,"kannaviou":null,"germasoyeia":3.31,"totalAll":132.09},{"date":"2005-12-15","kouris":56.39,"asprokremmos":30.3,"evretou":10.49,"kannaviou":null,"germasoyeia":3.04,"totalAll":129.74},{"date":"2006-01-01","kouris":55.35,"asprokremmos":30.09,"evretou":10.46,"kannaviou":null,"germasoyeia":2.84,"totalAll":128.24},{"date":"2006-01-15","kouris":54.42,"asprokremmos":29.88,"evretou":10.39,"kannaviou":null,"germasoyeia":2.74,"totalAll":127.13},{"date":"2006-02-01","kouris":54.28,"asprokremmos":29.94,"evretou":10.47,"kannaviou":null,"germasoyeia":2.72,"totalAll":128.24},{"date":"2006-02-15","kouris":57.1,"asprokremmos":30.89,"evretou":10.91,"kannaviou":null,"germasoyeia":3.06,"totalAll":133.62},{"date":"2006-03-01","kouris":57.8,"asprokremmos":30.78,"evretou":11.0,"kannaviou":null,"germasoyeia":3.13,"totalAll":134.17},{"date":"2006-03-15","kouris":58.08,"asprokremmos":30.8,"evretou":11.13,"kannaviou":null,"germasoyeia":3.11,"totalAll":134.72},{"date":"2006-04-01","kouris":58.25,"asprokremmos":30.58,"evretou":11.3,"kannaviou":null,"germasoyeia":3.05,"totalAll":135.25},{"date":"2006-04-15","kouris":57.59,"asprokremmos":30.04,"evretou":11.3,"kannaviou":null,"germasoyeia":2.93,"totalAll":134.59},{"date":"2006-05-01","kouris":55.64,"asprokremmos":29.49,"evretou":11.25,"kannaviou":null,"germasoyeia":2.74,"totalAll":131.45},{"date":"2006-05-15","kouris":53.51,"asprokremmos":28.97,"evretou":11.12,"kannaviou":null,"germasoyeia":2.51,"totalAll":127.73},{"date":"2006-06-01","kouris":50.97,"asprokremmos":28.13,"evretou":10.74,"kannaviou":null,"germasoyeia":2.24,"totalAll":122.1},{"date":"2006-06-15","kouris":48.53,"asprokremmos":27.07,"evretou":10.47,"kannaviou":null,"germasoyeia":1.96,"totalAll":116.62},{"date":"2006-07-01","kouris":45.5,"asprokremmos":25.96,"evretou":10.1,"kannaviou":null,"germasoyeia":1.71,"totalAll":110.35},{"date":"2006-07-15","kouris":43.23,"asprokremmos":24.87,"evretou":9.78,"kannaviou":null,"germasoyeia":1.52,"totalAll":105.3},{"date":"2006-08-01","kouris":40.12,"asprokremmos":23.48,"evretou":9.29,"kannaviou":null,"germasoyeia":1.25,"totalAll":98.42},{"date":"2006-08-15","kouris":37.95,"asprokremmos":22.22,"evretou":8.97,"kannaviou":null,"germasoyeia":1.04,"totalAll":93.11},{"date":"2006-09-01","kouris":34.55,"asprokremmos":20.67,"evretou":8.55,"kannaviou":null,"germasoyeia":0.79,"totalAll":85.65},{"date":"2006-09-15","kouris":32.08,"asprokremmos":19.41,"evretou":8.21,"kannaviou":null,"germasoyeia":0.63,"totalAll":79.98},{"date":"2006-10-01","kouris":29.19,"asprokremmos":18.01,"evretou":7.84,"kannaviou":null,"germasoyeia":0.49,"totalAll":73.81},{"date":"2006-10-15","kouris":26.79,"asprokremmos":16.95,"evretou":7.53,"kannaviou":null,"germasoyeia":0.38,"totalAll":69.22},{"date":"2006-11-01","kouris":24.98,"asprokremmos":17.21,"evretou":7.45,"kannaviou":null,"germasoyeia":0.35,"totalAll":68.1},{"date":"2006-11-15","kouris":24.73,"asprokremmos":17.27,"evretou":7.42,"kannaviou":null,"germasoyeia":0.52,"totalAll":68.92},{"date":"2006-12-01","kouris":24.37,"asprokremmos":16.91,"evretou":7.33,"kannaviou":null,"germasoyeia":0.53,"totalAll":66.29},{"date":"2006-12-15","kouris":22.6,"asprokremmos":16.62,"evretou":7.27,"kannaviou":null,"germasoyeia":0.53,"totalAll":63.84},{"date":"2007-01-01","kouris":20.62,"asprokremmos":16.23,"evretou":7.21,"kannaviou":2.7,"germasoyeia":0.47,"totalAll":63.88},{"date":"2007-01-15","kouris":19.42,"asprokremmos":16.02,"evretou":7.19,"kannaviou":3.16,"germasoyeia":0.48,"totalAll":63.08},{"date":"2007-02-01","kouris":18.34,"asprokremmos":15.83,"evretou":7.17,"kannaviou":3.6,"germasoyeia":0.54,"totalAll":62.61},{"date":"2007-02-15","kouris":21.85,"asprokremmos":17.01,"evretou":7.46,"kannaviou":2.8,"germasoyeia":1.36,"totalAll":68.84},{"date":"2007-03-01","kouris":23.35,"asprokremmos":17.41,"evretou":7.87,"kannaviou":2.7,"germasoyeia":1.63,"totalAll":72.28},{"date":"2007-03-15","kouris":23.92,"asprokremmos":17.48,"evretou":7.92,"kannaviou":2.7,"germasoyeia":2.02,"totalAll":74.26},{"date":"2007-04-01","kouris":23.23,"asprokremmos":17.59,"evretou":7.91,"kannaviou":2.72,"germasoyeia":2.21,"totalAll":74.84},{"date":"2007-04-15","kouris":22.32,"asprokremmos":17.43,"evretou":8.0,"kannaviou":2.9,"germasoyeia":2.31,"totalAll":74.46},{"date":"2007-05-01","kouris":21.07,"asprokremmos":16.99,"evretou":7.98,"kannaviou":3.0,"germasoyeia":2.35,"totalAll":72.19},{"date":"2007-05-15","kouris":20.05,"asprokremmos":16.8,"evretou":7.91,"kannaviou":2.92,"germasoyeia":2.37,"totalAll":70.65},{"date":"2007-06-01","kouris":19.68,"asprokremmos":17.14,"evretou":7.81,"kannaviou":3.18,"germasoyeia":2.37,"totalAll":70.03},{"date":"2007-06-15","kouris":18.27,"asprokremmos":16.5,"evretou":7.67,"kannaviou":3.11,"germasoyeia":2.32,"totalAll":66.79},{"date":"2007-07-01","kouris":16.17,"asprokremmos":15.62,"evretou":7.37,"kannaviou":3.24,"germasoyeia":2.17,"totalAll":62.06},{"date":"2007-07-15","kouris":15.07,"asprokremmos":14.77,"evretou":7.07,"kannaviou":3.22,"germasoyeia":1.86,"totalAll":57.87},{"date":"2007-08-01","kouris":14.0,"asprokremmos":13.71,"evretou":6.71,"kannaviou":2.96,"germasoyeia":1.54,"totalAll":51.87},{"date":"2007-08-15","kouris":13.16,"asprokremmos":12.83,"evretou":6.49,"kannaviou":3.12,"germasoyeia":1.25,"totalAll":47.87},{"date":"2007-09-01","kouris":11.71,"asprokremmos":11.78,"evretou":6.12,"kannaviou":2.82,"germasoyeia":0.95,"totalAll":42.98},{"date":"2007-09-15","kouris":10.14,"asprokremmos":10.87,"evretou":5.82,"kannaviou":2.7,"germasoyeia":0.75,"totalAll":38.99},{"date":"2007-10-01","kouris":8.03,"asprokremmos":9.87,"evretou":5.57,"kannaviou":2.65,"germasoyeia":0.48,"totalAll":34.52},{"date":"2007-10-15","kouris":6.66,"asprokremmos":9.09,"evretou":5.39,"kannaviou":2.55,"germasoyeia":0.28,"totalAll":31.4},{"date":"2007-11-01","kouris":4.49,"asprokremmos":8.19,"evretou":5.18,"kannaviou":2.6,"germasoyeia":0.25,"totalAll":27.69},{"date":"2007-11-15","kouris":3.06,"asprokremmos":7.65,"evretou":5.04,"kannaviou":2.64,"germasoyeia":0.2,"totalAll":25.36},{"date":"2007-12-01","kouris":2.21,"asprokremmos":7.29,"evretou":5.0,"kannaviou":2.7,"germasoyeia":0.19,"totalAll":24.3},{"date":"2007-12-15","kouris":4.61,"asprokremmos":7.75,"evretou":5.6,"kannaviou":3.29,"germasoyeia":0.2,"totalAll":27.36},{"date":"2008-01-01","kouris":4.78,"asprokremmos":7.85,"evretou":6.07,"kannaviou":3.65,"germasoyeia":0.19,"totalAll":28.87},{"date":"2008-01-15","kouris":4.46,"asprokremmos":7.61,"evretou":6.14,"kannaviou":3.9,"germasoyeia":0.19,"totalAll":29.03},{"date":"2008-02-01","kouris":4.0,"asprokremmos":7.39,"evretou":6.28,"kannaviou":4.09,"germasoyeia":0.23,"totalAll":29.39},{"date":"2008-02-15","kouris":3.55,"asprokremmos":7.21,"evretou":6.39,"kannaviou":4.7,"germasoyeia":0.28,"totalAll":30.1},{"date":"2008-03-01","kouris":4.9,"asprokremmos":7.84,"evretou":6.8,"kannaviou":4.9,"germasoyeia":0.46,"totalAll":33.2},{"date":"2008-03-15","kouris":4.54,"asprokremmos":7.77,"evretou":6.97,"kannaviou":5.02,"germasoyeia":0.54,"totalAll":33.76},{"date":"2008-04-01","kouris":4.39,"asprokremmos":7.58,"evretou":6.97,"kannaviou":5.09,"germasoyeia":0.59,"totalAll":32.83},{"date":"2008-04-15","kouris":3.96,"asprokremmos":7.46,"evretou":6.94,"kannaviou":5.12,"germasoyeia":0.61,"totalAll":32.35},{"date":"2008-05-01","kouris":3.4,"asprokremmos":7.27,"evretou":6.79,"kannaviou":5.13,"germasoyeia":0.47,"totalAll":31.09},{"date":"2008-05-15","kouris":2.96,"asprokremmos":7.07,"evretou":6.64,"kannaviou":5.11,"germasoyeia":0.35,"totalAll":29.95},{"date":"2008-06-01","kouris":4.02,"asprokremmos":6.76,"evretou":6.41,"kannaviou":5.08,"germasoyeia":0.17,"totalAll":28.46},{"date":"2008-06-15","kouris":3.96,"asprokremmos":6.5,"evretou":6.17,"kannaviou":5.04,"germasoyeia":0.09,"totalAll":26.86},{"date":"2008-07-01","kouris":2.98,"asprokremmos":6.14,"evretou":5.86,"kannaviou":4.98,"germasoyeia":0.09,"totalAll":24.59},{"date":"2008-07-15","kouris":2.13,"asprokremmos":5.79,"evretou":5.55,"kannaviou":4.91,"germasoyeia":0.08,"totalAll":22.52},{"date":"2008-08-01","kouris":1.29,"asprokremmos":5.39,"evretou":5.16,"kannaviou":4.86,"germasoyeia":0.07,"totalAll":20.38},{"date":"2008-08-15","kouris":1.02,"asprokremmos":5.04,"evretou":4.85,"kannaviou":4.82,"germasoyeia":0.06,"totalAll":18.78},{"date":"2008-09-01","kouris":0.83,"asprokremmos":4.57,"evretou":4.52,"kannaviou":4.67,"germasoyeia":0.06,"totalAll":17.1},{"date":"2008-09-15","kouris":0.68,"asprokremmos":4.19,"evretou":4.25,"kannaviou":4.74,"germasoyeia":0.06,"totalAll":15.83},{"date":"2008-10-01","kouris":0.59,"asprokremmos":3.8,"evretou":3.92,"kannaviou":4.71,"germasoyeia":0.09,"totalAll":14.82},{"date":"2008-10-15","kouris":0.51,"asprokremmos":3.5,"evretou":3.65,"kannaviou":4.71,"germasoyeia":0.09,"totalAll":14.13},{"date":"2008-11-01","kouris":0.56,"asprokremmos":3.13,"evretou":3.48,"kannaviou":4.7,"germasoyeia":0.1,"totalAll":13.44},{"date":"2008-11-15","kouris":0.56,"asprokremmos":2.88,"evretou":3.31,"kannaviou":4.69,"germasoyeia":0.1,"totalAll":13.05},{"date":"2008-12-01","kouris":0.83,"asprokremmos":2.57,"evretou":3.22,"kannaviou":4.57,"germasoyeia":0.1,"totalAll":12.99},{"date":"2008-12-15","kouris":1.1,"asprokremmos":2.41,"evretou":3.09,"kannaviou":4.57,"germasoyeia":0.1,"totalAll":13.01},{"date":"2009-01-01","kouris":2.25,"asprokremmos":3.08,"evretou":3.12,"kannaviou":4.43,"germasoyeia":0.22,"totalAll":15.72},{"date":"2009-01-15","kouris":2.77,"asprokremmos":3.08,"evretou":3.13,"kannaviou":4.29,"germasoyeia":0.24,"totalAll":17.0},{"date":"2009-02-01","kouris":6.03,"asprokremmos":5.71,"evretou":4.12,"kannaviou":4.98,"germasoyeia":2.18,"totalAll":29.79},{"date":"2009-02-15","kouris":9.6,"asprokremmos":6.67,"evretou":5.13,"kannaviou":5.45,"germasoyeia":3.15,"totalAll":37.69},{"date":"2009-03-01","kouris":16.68,"asprokremmos":13.14,"evretou":7.88,"kannaviou":7.19,"germasoyeia":4.12,"totalAll":59.55},{"date":"2009-03-15","kouris":21.87,"asprokremmos":16.06,"evretou":9.24,"kannaviou":8.24,"germasoyeia":4.93,"totalAll":71.97},{"date":"2009-04-01","kouris":26.18,"asprokremmos":20.02,"evretou":11.13,"kannaviou":9.73,"germasoyeia":5.98,"totalAll":87},{"date":"2009-04-15","kouris":30.52,"asprokremmos":21.43,"evretou":12.05,"kannaviou":10.27,"germasoyeia":6.83,"totalAll":95.75},{"date":"2009-05-01","kouris":33.38,"asprokremmos":21.86,"evretou":12.48,"kannaviou":10.61,"germasoyeia":7.13,"totalAll":100.53},{"date":"2009-05-15","kouris":35.42,"asprokremmos":22.01,"evretou":12.6,"kannaviou":10.81,"germasoyeia":7.1,"totalAll":102.58},{"date":"2009-06-01","kouris":37.05,"asprokremmos":21.89,"evretou":12.53,"kannaviou":10.96,"germasoyeia":6.84,"totalAll":103.25},{"date":"2009-06-15","kouris":36.55,"asprokremmos":21.43,"evretou":12.28,"kannaviou":10.95,"germasoyeia":6.51,"totalAll":101.39},{"date":"2009-07-01","kouris":35.75,"asprokremmos":20.83,"evretou":11.91,"kannaviou":10.86,"germasoyeia":6.09,"totalAll":98.36},{"date":"2009-07-15","kouris":34.95,"asprokremmos":20.14,"evretou":11.58,"kannaviou":10.8,"germasoyeia":5.75,"totalAll":95.41},{"date":"2009-08-01","kouris":33.88,"asprokremmos":19.25,"evretou":11.13,"kannaviou":10.66,"germasoyeia":5.32,"totalAll":91.36},{"date":"2009-08-15","kouris":33.27,"asprokremmos":18.6,"evretou":10.79,"kannaviou":10.57,"germasoyeia":4.95,"totalAll":88.38},{"date":"2009-09-01","kouris":32.12,"asprokremmos":17.51,"evretou":10.36,"kannaviou":10.48,"germasoyeia":4.44,"totalAll":84.17},{"date":"2009-09-15","kouris":30.82,"asprokremmos":16.76,"evretou":10.01,"kannaviou":10.37,"germasoyeia":4.08,"totalAll":80.81},{"date":"2009-10-01","kouris":29.76,"asprokremmos":15.96,"evretou":9.67,"kannaviou":10.32,"germasoyeia":3.77,"totalAll":78.48},{"date":"2009-10-15","kouris":28.79,"asprokremmos":15.21,"evretou":9.47,"kannaviou":10.26,"germasoyeia":3.54,"totalAll":76.05},{"date":"2009-11-01","kouris":28.29,"asprokremmos":14.59,"evretou":9.28,"kannaviou":10.24,"germasoyeia":3.29,"totalAll":73.94},{"date":"2009-11-15","kouris":30.85,"asprokremmos":14.5,"evretou":9.26,"kannaviou":10.31,"germasoyeia":3.26,"totalAll":74.74},{"date":"2009-12-01","kouris":30.46,"asprokremmos":14.2,"evretou":9.15,"kannaviou":10.28,"germasoyeia":3.08,"totalAll":73.86},{"date":"2009-12-15","kouris":32.95,"asprokremmos":15.8,"evretou":9.48,"kannaviou":10.46,"germasoyeia":3.98,"totalAll":82.71},{"date":"2010-01-01","kouris":39.5,"asprokremmos":18.0,"evretou":10.28,"kannaviou":11.07,"germasoyeia":4.88,"totalAll":95.6},{"date":"2010-01-15","kouris":41.0,"asprokremmos":18.31,"evretou":10.52,"kannaviou":11.29,"germasoyeia":4.96,"totalAll":98.96},{"date":"2010-02-01","kouris":52.89,"asprokremmos":26.74,"evretou":14.54,"kannaviou":14.4,"germasoyeia":7.43,"totalAll":137.81},{"date":"2010-02-15","kouris":60.7,"asprokremmos":31.49,"evretou":16.7,"kannaviou":16.37,"germasoyeia":8.52,"totalAll":158.74},{"date":"2010-03-01","kouris":65.84,"asprokremmos":34.85,"evretou":17.76,"kannaviou":16.93,"germasoyeia":9.72,"totalAll":174.07},{"date":"2010-03-15","kouris":72.57,"asprokremmos":37.12,"evretou":18.65,"kannaviou":17.17,"germasoyeia":10.77,"totalAll":188.65},{"date":"2010-04-01","kouris":73.49,"asprokremmos":37.66,"evretou":18.87,"kannaviou":17.16,"germasoyeia":11.19,"totalAll":193.5},{"date":"2010-04-15","kouris":74.12,"asprokremmos":38.09,"evretou":18.86,"kannaviou":16.95,"germasoyeia":11.25,"totalAll":195.1},{"date":"2010-05-01","kouris":75.07,"asprokremmos":38.33,"evretou":18.64,"kannaviou":16.71,"germasoyeia":11.26,"totalAll":195.16},{"date":"2010-05-15","kouris":74.92,"asprokremmos":38.62,"evretou":18.38,"kannaviou":16.48,"germasoyeia":11.24,"totalAll":194.67},{"date":"2010-06-01","kouris":73.82,"asprokremmos":38.29,"evretou":17.96,"kannaviou":16.05,"germasoyeia":10.97,"totalAll":191.41},{"date":"2010-06-15","kouris":72.82,"asprokremmos":38.05,"evretou":17.59,"kannaviou":15.69,"germasoyeia":10.8,"totalAll":188.65},{"date":"2010-07-01","kouris":71.1,"asprokremmos":37.44,"evretou":17.14,"kannaviou":15.2,"germasoyeia":10.45,"totalAll":183.92},{"date":"2010-07-15","kouris":69.6,"asprokremmos":36.82,"evretou":16.73,"kannaviou":14.77,"germasoyeia":10.08,"totalAll":179.46},{"date":"2010-08-01","kouris":69.05,"asprokremmos":36.1,"evretou":16.16,"kannaviou":14.23,"germasoyeia":9.46,"totalAll":174.12},{"date":"2010-08-15","kouris":67.51,"asprokremmos":35.44,"evretou":15.67,"kannaviou":13.76,"germasoyeia":8.94,"totalAll":169.21},{"date":"2010-09-01","kouris":64.92,"asprokremmos":34.72,"evretou":15.1,"kannaviou":13.2,"germasoyeia":8.44,"totalAll":162.79},{"date":"2010-09-15","kouris":62.99,"asprokremmos":34.14,"evretou":14.66,"kannaviou":12.82,"germasoyeia":7.96,"totalAll":157.96},{"date":"2010-10-01","kouris":60.76,"asprokremmos":33.42,"evretou":14.16,"kannaviou":12.47,"germasoyeia":7.4,"totalAll":152.54},{"date":"2010-10-15","kouris":58.91,"asprokremmos":32.58,"evretou":13.81,"kannaviou":12.4,"germasoyeia":6.9,"totalAll":148.08},{"date":"2010-11-01","kouris":56.95,"asprokremmos":31.72,"evretou":13.54,"kannaviou":12.36,"germasoyeia":6.47,"totalAll":143.69},{"date":"2010-11-15","kouris":55.37,"asprokremmos":31.32,"evretou":13.28,"kannaviou":12.09,"germasoyeia":6.17,"totalAll":140.27},{"date":"2010-12-01","kouris":53.63,"asprokremmos":31.05,"evretou":12.97,"kannaviou":11.89,"germasoyeia":5.79,"totalAll":136.77},{"date":"2010-12-15","kouris":54.75,"asprokremmos":31.1,"evretou":12.93,"kannaviou":11.87,"germasoyeia":5.85,"totalAll":138.16},{"date":"2011-01-01","kouris":55.85,"asprokremmos":31.23,"evretou":12.91,"kannaviou":11.89,"germasoyeia":5.86,"totalAll":139.27},{"date":"2011-01-15","kouris":55.84,"asprokremmos":31.41,"evretou":12.96,"kannaviou":11.96,"germasoyeia":5.8,"totalAll":139.93},{"date":"2011-02-01","kouris":57.1,"asprokremmos":32.18,"evretou":13.37,"kannaviou":12.34,"germasoyeia":6.43,"totalAll":145.95},{"date":"2011-02-15","kouris":58.91,"asprokremmos":32.56,"evretou":13.68,"kannaviou":12.58,"germasoyeia":6.59,"totalAll":148.83},{"date":"2011-03-01","kouris":61.62,"asprokremmos":34.58,"evretou":14.76,"kannaviou":13.61,"germasoyeia":6.94,"totalAll":157.4},{"date":"2011-03-15","kouris":64.01,"asprokremmos":37.06,"evretou":16.14,"kannaviou":14.79,"germasoyeia":7.25,"totalAll":167.28},{"date":"2011-04-01","kouris":66.96,"asprokremmos":38.74,"evretou":17.11,"kannaviou":15.44,"germasoyeia":7.8,"totalAll":176.32},{"date":"2011-04-15","kouris":67.34,"asprokremmos":39.45,"evretou":17.54,"kannaviou":15.74,"germasoyeia":7.96,"totalAll":180.38},{"date":"2011-05-01","kouris":68.76,"asprokremmos":40.05,"evretou":17.69,"kannaviou":15.66,"germasoyeia":8.01,"totalAll":182.21},{"date":"2011-05-15","kouris":68.24,"asprokremmos":40.09,"evretou":17.63,"kannaviou":15.41,"germasoyeia":7.98,"totalAll":181.98},{"date":"2011-06-01","kouris":67.1,"asprokremmos":39.91,"evretou":17.38,"kannaviou":15.17,"germasoyeia":7.81,"totalAll":179.85},{"date":"2011-06-15","kouris":65.7,"asprokremmos":39.55,"evretou":17.06,"kannaviou":14.85,"germasoyeia":7.53,"totalAll":176.44},{"date":"2011-07-01","kouris":63.46,"asprokremmos":38.97,"evretou":16.59,"kannaviou":14.42,"germasoyeia":7.15,"totalAll":171.32},{"date":"2011-07-15","kouris":61.07,"asprokremmos":38.41,"evretou":16.17,"kannaviou":13.99,"germasoyeia":6.79,"totalAll":166.18},{"date":"2011-08-01","kouris":57.76,"asprokremmos":37.56,"evretou":15.63,"kannaviou":13.44,"germasoyeia":6.36,"totalAll":158.71},{"date":"2011-08-15","kouris":55.37,"asprokremmos":36.8,"evretou":15.15,"kannaviou":12.98,"germasoyeia":5.91,"totalAll":152.63},{"date":"2011-09-01","kouris":53.21,"asprokremmos":35.95,"evretou":14.67,"kannaviou":12.51,"germasoyeia":5.34,"totalAll":146.44},{"date":"2011-09-15","kouris":51.09,"asprokremmos":35.16,"evretou":14.2,"kannaviou":12.07,"germasoyeia":4.82,"totalAll":140.71},{"date":"2011-10-01","kouris":49.06,"asprokremmos":34.49,"evretou":13.82,"kannaviou":11.63,"germasoyeia":4.4,"totalAll":135.6},{"date":"2011-10-15","kouris":47.18,"asprokremmos":33.87,"evretou":13.53,"kannaviou":11.24,"germasoyeia":4.12,"totalAll":131.25},{"date":"2011-11-01","kouris":45.34,"asprokremmos":33.33,"evretou":13.23,"kannaviou":10.78,"germasoyeia":3.77,"totalAll":126.82},{"date":"2011-11-15","kouris":43.65,"asprokremmos":32.97,"evretou":13.02,"kannaviou":10.44,"germasoyeia":3.5,"totalAll":123.58},{"date":"2011-12-01","kouris":45.21,"asprokremmos":32.84,"evretou":12.91,"kannaviou":10.15,"germasoyeia":3.29,"totalAll":122.46},{"date":"2011-12-15","kouris":44.84,"asprokremmos":32.69,"evretou":12.8,"kannaviou":9.91,"germasoyeia":3.2,"totalAll":121.55},{"date":"2012-01-01","kouris":45.61,"asprokremmos":33.61,"evretou":12.88,"kannaviou":9.92,"germasoyeia":3.04,"totalAll":124.92},{"date":"2012-01-15","kouris":54.73,"asprokremmos":39.72,"evretou":15.37,"kannaviou":11.61,"germasoyeia":4.22,"totalAll":148.93},{"date":"2012-02-01","kouris":74.87,"asprokremmos":52.38,"evretou":22.57,"kannaviou":17.17,"germasoyeia":11.17,"totalAll":215.01},{"date":"2012-02-15","kouris":85.88,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":236.12},{"date":"2012-03-01","kouris":97.76,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":251.49},{"date":"2012-03-15","kouris":107.6,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":263.89},{"date":"2012-04-01","kouris":114.45,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":272.53},{"date":"2012-04-15","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":273.65},{"date":"2012-05-01","kouris":115,"asprokremmos":52.38,"evretou":23.98,"kannaviou":17.05,"germasoyeia":13.5,"totalAll":273.47},{"date":"2012-05-15","kouris":114.55,"asprokremmos":52.23,"evretou":23.79,"kannaviou":17.01,"germasoyeia":13.43,"totalAll":273.5},{"date":"2012-06-01","kouris":114.43,"asprokremmos":52.18,"evretou":23.43,"kannaviou":16.76,"germasoyeia":13.15,"totalAll":271.61},{"date":"2012-06-15","kouris":113.5,"asprokremmos":51.88,"evretou":22.97,"kannaviou":16.47,"germasoyeia":12.62,"totalAll":267.7},{"date":"2012-07-01","kouris":111.11,"asprokremmos":51.34,"evretou":22.47,"kannaviou":16.11,"germasoyeia":12.2,"totalAll":262.31},{"date":"2012-07-15","kouris":108.34,"asprokremmos":50.6,"evretou":21.94,"kannaviou":15.72,"germasoyeia":11.8,"totalAll":256.0},{"date":"2012-08-01","kouris":104.85,"asprokremmos":49.74,"evretou":21.34,"kannaviou":15.2,"germasoyeia":11.35,"totalAll":248.08},{"date":"2012-08-15","kouris":101.93,"asprokremmos":48.94,"evretou":20.8,"kannaviou":14.77,"germasoyeia":10.97,"totalAll":241.43},{"date":"2012-09-01","kouris":98.04,"asprokremmos":47.99,"evretou":20.11,"kannaviou":14.18,"germasoyeia":10.5,"totalAll":232.76},{"date":"2012-09-15","kouris":94.68,"asprokremmos":47.16,"evretou":19.63,"kannaviou":13.75,"germasoyeia":10.14,"totalAll":225.56},{"date":"2012-10-01","kouris":94.14,"asprokremmos":46.45,"evretou":19.1,"kannaviou":13.28,"germasoyeia":9.69,"totalAll":221.07},{"date":"2012-10-15","kouris":88.61,"asprokremmos":46.09,"evretou":18.82,"kannaviou":12.99,"germasoyeia":9.38,"totalAll":213.55},{"date":"2012-11-01","kouris":86.85,"asprokremmos":45.59,"evretou":18.52,"kannaviou":12.63,"germasoyeia":8.9,"totalAll":207.88},{"date":"2012-11-15","kouris":86.21,"asprokremmos":45.65,"evretou":18.44,"kannaviou":12.54,"germasoyeia":8.62,"totalAll":205.88},{"date":"2012-12-01","kouris":85.77,"asprokremmos":45.56,"evretou":18.25,"kannaviou":12.36,"germasoyeia":8.48,"totalAll":204.18},{"date":"2012-12-15","kouris":86.21,"asprokremmos":46.36,"evretou":18.75,"kannaviou":12.59,"germasoyeia":8.56,"totalAll":206.62},{"date":"2013-01-01","kouris":101.38,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":11.88,"totalAll":246.95},{"date":"2013-01-15","kouris":107.16,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":12.59,"totalAll":251.71},{"date":"2013-02-01","kouris":106.74,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":12.9,"totalAll":254.2},{"date":"2013-02-15","kouris":108.69,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.04,"totalAll":255.43},{"date":"2013-03-01","kouris":109.78,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.2,"totalAll":257.31},{"date":"2013-03-15","kouris":109.75,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.21,"totalAll":257.23},{"date":"2013-04-01","kouris":108.08,"asprokremmos":52.38,"evretou":24,"kannaviou":17.08,"germasoyeia":13.2,"totalAll":255.33},{"date":"2013-04-15","kouris":106.27,"asprokremmos":52.38,"evretou":23.92,"kannaviou":16.98,"germasoyeia":13.16,"totalAll":252.85},{"date":"2013-05-01","kouris":106.84,"asprokremmos":52.38,"evretou":23.99,"kannaviou":17.12,"germasoyeia":13.46,"totalAll":252.65},{"date":"2013-05-15","kouris":104.79,"asprokremmos":52.15,"evretou":23.81,"kannaviou":17.04,"germasoyeia":13.24,"totalAll":249.39},{"date":"2013-06-01","kouris":103.1,"asprokremmos":51.96,"evretou":23.44,"kannaviou":16.73,"germasoyeia":12.81,"totalAll":244.24},{"date":"2013-06-15","kouris":100.24,"asprokremmos":51.47,"evretou":23.09,"kannaviou":16.43,"germasoyeia":12.42,"totalAll":238.73},{"date":"2013-07-01","kouris":96.42,"asprokremmos":50.76,"evretou":22.51,"kannaviou":15.9,"germasoyeia":11.95,"totalAll":231.04},{"date":"2013-07-15","kouris":93.13,"asprokremmos":50.15,"evretou":22.02,"kannaviou":15.41,"germasoyeia":11.54,"totalAll":224.48},{"date":"2013-08-01","kouris":89.88,"asprokremmos":49.29,"evretou":21.38,"kannaviou":14.81,"germasoyeia":10.97,"totalAll":217.01},{"date":"2013-08-15","kouris":86.34,"asprokremmos":48.53,"evretou":20.8,"kannaviou":14.33,"germasoyeia":10.53,"totalAll":209.46},{"date":"2013-09-01","kouris":82.05,"asprokremmos":47.52,"evretou":20.16,"kannaviou":13.74,"germasoyeia":9.96,"totalAll":200.08},{"date":"2013-09-15","kouris":78.5,"asprokremmos":46.66,"evretou":19.61,"kannaviou":13.28,"germasoyeia":9.54,"totalAll":192.79},{"date":"2013-10-01","kouris":74.72,"asprokremmos":45.91,"evretou":19.09,"kannaviou":12.86,"germasoyeia":9.19,"totalAll":185.8},{"date":"2013-10-15","kouris":71.76,"asprokremmos":45.25,"evretou":18.76,"kannaviou":12.55,"germasoyeia":8.87,"totalAll":179.87},{"date":"2013-11-01","kouris":68.28,"asprokremmos":44.52,"evretou":18.38,"kannaviou":12.2,"germasoyeia":8.3,"totalAll":172.98},{"date":"2013-11-15","kouris":65.57,"asprokremmos":44.19,"evretou":18.07,"kannaviou":11.92,"germasoyeia":7.86,"totalAll":167.98},{"date":"2013-12-01","kouris":63.26,"asprokremmos":43.81,"evretou":17.89,"kannaviou":11.65,"germasoyeia":7.48,"totalAll":163.89},{"date":"2013-12-15","kouris":62.49,"asprokremmos":43.68,"evretou":17.77,"kannaviou":11.46,"germasoyeia":7.28,"totalAll":161.54},{"date":"2014-01-01","kouris":60.7,"asprokremmos":43.37,"evretou":17.59,"kannaviou":11.34,"germasoyeia":7.06,"totalAll":158.45},{"date":"2014-01-15","kouris":58.94,"asprokremmos":43.19,"evretou":17.48,"kannaviou":11.29,"germasoyeia":6.93,"totalAll":155.55},{"date":"2014-02-01","kouris":56.56,"asprokremmos":43.02,"evretou":17.4,"kannaviou":11.33,"germasoyeia":6.81,"totalAll":152.93},{"date":"2014-02-15","kouris":54.36,"asprokremmos":42.67,"evretou":17.26,"kannaviou":11.29,"germasoyeia":6.66,"totalAll":149.88},{"date":"2014-03-01","kouris":52.43,"asprokremmos":42.41,"evretou":17.28,"kannaviou":11.37,"germasoyeia":6.61,"totalAll":147.96},{"date":"2014-03-15","kouris":50.85,"asprokremmos":42.32,"evretou":17.32,"kannaviou":11.41,"germasoyeia":6.56,"totalAll":146.35},{"date":"2014-04-01","kouris":47.85,"asprokremmos":41.83,"evretou":17.2,"kannaviou":11.36,"germasoyeia":6.29,"totalAll":141.95},{"date":"2014-04-15","kouris":45.54,"asprokremmos":41.3,"evretou":16.95,"kannaviou":11.3,"germasoyeia":6.15,"totalAll":138.04},{"date":"2014-05-01","kouris":43.19,"asprokremmos":40.81,"evretou":16.65,"kannaviou":11.21,"germasoyeia":5.89,"totalAll":133.83},{"date":"2014-05-15","kouris":42.85,"asprokremmos":40.66,"evretou":16.51,"kannaviou":11.22,"germasoyeia":5.75,"totalAll":132.12},{"date":"2014-06-01","kouris":41.61,"asprokremmos":39.97,"evretou":16.14,"kannaviou":11.12,"germasoyeia":5.43,"totalAll":128.73},{"date":"2014-06-15","kouris":40.25,"asprokremmos":39.2,"evretou":15.66,"kannaviou":11.03,"germasoyeia":5.09,"totalAll":125.58},{"date":"2014-07-01","kouris":38.3,"asprokremmos":38.17,"evretou":15.09,"kannaviou":10.87,"germasoyeia":4.68,"totalAll":120.89},{"date":"2014-07-15","kouris":36.61,"asprokremmos":37.24,"evretou":14.54,"kannaviou":10.71,"germasoyeia":4.28,"totalAll":116.39},{"date":"2014-08-01","kouris":34.49,"asprokremmos":36.02,"evretou":13.82,"kannaviou":10.51,"germasoyeia":3.86,"totalAll":111.1},{"date":"2014-08-15","kouris":32.8,"asprokremmos":34.97,"evretou":13.37,"kannaviou":10.35,"germasoyeia":3.98,"totalAll":107.2},{"date":"2014-09-01","kouris":30.49,"asprokremmos":33.57,"evretou":12.78,"kannaviou":10.19,"germasoyeia":3.06,"totalAll":100.91},{"date":"2014-09-15","kouris":28.72,"asprokremmos":32.45,"evretou":12.31,"kannaviou":9.99,"germasoyeia":2.73,"totalAll":96.43},{"date":"2014-10-01","kouris":26.53,"asprokremmos":31.26,"evretou":11.83,"kannaviou":9.81,"germasoyeia":2.34,"totalAll":91.58},{"date":"2014-10-15","kouris":24.8,"asprokremmos":30.17,"evretou":11.32,"kannaviou":9.63,"germasoyeia":2.11,"totalAll":87.64},{"date":"2014-11-01","kouris":23.0,"asprokremmos":29.3,"evretou":11.04,"kannaviou":9.5,"germasoyeia":1.77,"totalAll":84.25},{"date":"2014-11-15","kouris":21.79,"asprokremmos":28.83,"evretou":10.93,"kannaviou":9.41,"germasoyeia":1.56,"totalAll":82.24},{"date":"2014-12-01","kouris":20.87,"asprokremmos":28.55,"evretou":10.87,"kannaviou":9.33,"germasoyeia":1.38,"totalAll":81.04},{"date":"2014-12-15","kouris":20.27,"asprokremmos":28.32,"evretou":10.87,"kannaviou":9.33,"germasoyeia":1.3,"totalAll":80.66},{"date":"2015-01-01","kouris":20.02,"asprokremmos":28.01,"evretou":10.89,"kannaviou":9.34,"germasoyeia":1.1,"totalAll":80.58},{"date":"2015-01-15","kouris":27.25,"asprokremmos":31.16,"evretou":12.99,"kannaviou":10.37,"germasoyeia":4.54,"totalAll":106.05},{"date":"2015-02-01","kouris":30.23,"asprokremmos":31.96,"evretou":13.48,"kannaviou":10.44,"germasoyeia":5.82,"totalAll":116.16},{"date":"2015-02-15","kouris":36.32,"asprokremmos":39.72,"evretou":16.2,"kannaviou":12.8,"germasoyeia":7.7,"totalAll":144.18},{"date":"2015-03-01","kouris":43.39,"asprokremmos":42.19,"evretou":17.71,"kannaviou":13.65,"germasoyeia":8.97,"totalAll":158.87},{"date":"2015-03-15","kouris":43.52,"asprokremmos":43.55,"evretou":18.5,"kannaviou":13.98,"germasoyeia":9.56,"totalAll":164.72},{"date":"2015-04-01","kouris":47.07,"asprokremmos":44.5,"evretou":18.92,"kannaviou":14.11,"germasoyeia":9.92,"totalAll":173.34},{"date":"2015-04-15","kouris":48.34,"asprokremmos":45.0,"evretou":19.11,"kannaviou":14.01,"germasoyeia":10.16,"totalAll":175.69},{"date":"2015-05-01","kouris":47.07,"asprokremmos":45.13,"evretou":19.09,"kannaviou":13.82,"germasoyeia":10.16,"totalAll":175.01},{"date":"2015-05-15","kouris":45.55,"asprokremmos":44.82,"evretou":18.99,"kannaviou":13.51,"germasoyeia":10.08,"totalAll":172.57},{"date":"2015-06-01","kouris":43.28,"asprokremmos":44.39,"evretou":18.69,"kannaviou":13.09,"germasoyeia":9.82,"totalAll":168.3},{"date":"2015-06-15","kouris":41.41,"asprokremmos":43.88,"evretou":18.41,"kannaviou":12.84,"germasoyeia":9.57,"totalAll":164.46},{"date":"2015-07-01","kouris":38.72,"asprokremmos":42.95,"evretou":17.98,"kannaviou":12.68,"germasoyeia":9.24,"totalAll":159.0},{"date":"2015-07-15","kouris":37.14,"asprokremmos":42.08,"evretou":17.57,"kannaviou":12.48,"germasoyeia":8.93,"totalAll":154.71},{"date":"2015-08-01","kouris":34.48,"asprokremmos":40.81,"evretou":17.01,"kannaviou":12.19,"germasoyeia":8.49,"totalAll":148.0},{"date":"2015-08-15","kouris":32.48,"asprokremmos":39.74,"evretou":16.55,"kannaviou":11.88,"germasoyeia":8.06,"totalAll":142.53},{"date":"2015-09-01","kouris":29.96,"asprokremmos":38.41,"evretou":15.94,"kannaviou":11.54,"germasoyeia":7.6,"totalAll":135.47},{"date":"2015-09-15","kouris":27.85,"asprokremmos":37.44,"evretou":15.45,"kannaviou":11.27,"germasoyeia":7.29,"totalAll":129.95},{"date":"2015-10-01","kouris":25.75,"asprokremmos":36.74,"evretou":15.04,"kannaviou":10.72,"germasoyeia":6.94,"totalAll":124.45},{"date":"2015-10-15","kouris":25.37,"asprokremmos":36.2,"evretou":14.72,"kannaviou":10.29,"germasoyeia":6.72,"totalAll":120.29},{"date":"2015-11-01","kouris":24.25,"asprokremmos":36.04,"evretou":14.49,"kannaviou":9.79,"germasoyeia":6.43,"totalAll":117.24},{"date":"2015-11-15","kouris":22.75,"asprokremmos":35.77,"evretou":14.26,"kannaviou":9.39,"germasoyeia":6.2,"totalAll":114.01},{"date":"2015-12-01","kouris":22.11,"asprokremmos":35.49,"evretou":14.07,"kannaviou":9.0,"germasoyeia":5.89,"totalAll":111.23},{"date":"2015-12-15","kouris":21.49,"asprokremmos":35.34,"evretou":13.93,"kannaviou":8.66,"germasoyeia":5.68,"totalAll":109.58},{"date":"2016-01-01","kouris":21.29,"asprokremmos":35.18,"evretou":13.82,"kannaviou":8.24,"germasoyeia":5.53,"totalAll":109.09},{"date":"2016-01-15","kouris":21.18,"asprokremmos":35.18,"evretou":13.8,"kannaviou":8.01,"germasoyeia":5.55,"totalAll":109.28},{"date":"2016-02-01","kouris":21.36,"asprokremmos":35.05,"evretou":13.71,"kannaviou":7.83,"germasoyeia":5.54,"totalAll":109.99},{"date":"2016-02-15","kouris":21.37,"asprokremmos":34.95,"evretou":13.66,"kannaviou":7.69,"germasoyeia":5.49,"totalAll":110.22},{"date":"2016-03-01","kouris":21.14,"asprokremmos":34.78,"evretou":13.56,"kannaviou":7.48,"germasoyeia":5.38,"totalAll":109.79},{"date":"2016-03-15","kouris":20.73,"asprokremmos":34.45,"evretou":13.5,"kannaviou":7.31,"germasoyeia":5.34,"totalAll":109.09},{"date":"2016-04-01","kouris":22.4,"asprokremmos":34.47,"evretou":13.72,"kannaviou":7.56,"germasoyeia":5.39,"totalAll":111.69},{"date":"2016-04-15","kouris":21.66,"asprokremmos":33.99,"evretou":13.54,"kannaviou":7.37,"germasoyeia":5.25,"totalAll":109.69},{"date":"2016-05-01","kouris":20.47,"asprokremmos":33.33,"evretou":13.21,"kannaviou":7.09,"germasoyeia":4.89,"totalAll":106.47},{"date":"2016-05-15","kouris":19.56,"asprokremmos":32.81,"evretou":13.02,"kannaviou":6.84,"germasoyeia":4.59,"totalAll":104.05},{"date":"2016-06-01","kouris":19.1,"asprokremmos":31.88,"evretou":12.65,"kannaviou":6.61,"germasoyeia":4.17,"totalAll":101.55},{"date":"2016-06-15","kouris":18.36,"asprokremmos":30.98,"evretou":12.29,"kannaviou":6.42,"germasoyeia":3.73,"totalAll":98.38},{"date":"2016-07-01","kouris":17.35,"asprokremmos":29.77,"evretou":11.82,"kannaviou":6.14,"germasoyeia":3.24,"totalAll":93.48},{"date":"2016-07-15","kouris":16.61,"asprokremmos":28.71,"evretou":11.33,"kannaviou":5.92,"germasoyeia":2.79,"totalAll":89.21},{"date":"2016-08-01","kouris":16.92,"asprokremmos":27.37,"evretou":10.76,"kannaviou":5.68,"germasoyeia":2.29,"totalAll":83.85},{"date":"2016-08-15","kouris":16.13,"asprokremmos":26.17,"evretou":10.24,"kannaviou":5.46,"germasoyeia":1.92,"totalAll":79.55},{"date":"2016-09-01","kouris":15.33,"asprokremmos":24.71,"evretou":9.63,"kannaviou":5.22,"germasoyeia":1.5,"totalAll":74.57},{"date":"2016-09-15","kouris":14.42,"asprokremmos":23.54,"evretou":9.15,"kannaviou":5.01,"germasoyeia":1.2,"totalAll":70.3},{"date":"2016-10-01","kouris":13.31,"asprokremmos":22.17,"evretou":8.62,"kannaviou":4.78,"germasoyeia":0.92,"totalAll":65.51},{"date":"2016-10-15","kouris":12.47,"asprokremmos":21.04,"evretou":8.2,"kannaviou":4.59,"germasoyeia":0.62,"totalAll":61.74},{"date":"2016-11-01","kouris":11.7,"asprokremmos":19.81,"evretou":7.82,"kannaviou":4.45,"germasoyeia":0.31,"totalAll":58.15},{"date":"2016-11-15","kouris":11.4,"asprokremmos":19.1,"evretou":7.66,"kannaviou":4.34,"germasoyeia":0.06,"totalAll":56.27},{"date":"2016-12-01","kouris":11.01,"asprokremmos":18.3,"evretou":7.41,"kannaviou":4.24,"germasoyeia":0.02,"totalAll":54.35},{"date":"2016-12-15","kouris":11.06,"asprokremmos":18.0,"evretou":7.4,"kannaviou":4.19,"germasoyeia":0.04,"totalAll":54.67},{"date":"2017-01-01","kouris":13.07,"asprokremmos":18.46,"evretou":7.71,"kannaviou":4.39,"germasoyeia":0.53,"totalAll":60.65},{"date":"2017-01-15","kouris":18.77,"asprokremmos":21.53,"evretou":9.52,"kannaviou":5.6,"germasoyeia":1.79,"totalAll":76.41},{"date":"2017-02-01","kouris":21.86,"asprokremmos":21.59,"evretou":10.12,"kannaviou":5.89,"germasoyeia":2.28,"totalAll":81.55},{"date":"2017-02-15","kouris":22.85,"asprokremmos":21.62,"evretou":10.4,"kannaviou":5.99,"germasoyeia":2.49,"totalAll":83.11},{"date":"2017-03-01","kouris":23.45,"asprokremmos":21.4,"evretou":10.45,"kannaviou":6.01,"germasoyeia":2.64,"totalAll":83.53},{"date":"2017-03-15","kouris":24.43,"asprokremmos":21.76,"evretou":10.95,"kannaviou":6.44,"germasoyeia":2.86,"totalAll":86.74},{"date":"2017-04-01","kouris":24.78,"asprokremmos":21.82,"evretou":11.43,"kannaviou":6.79,"germasoyeia":3.15,"totalAll":88.5},{"date":"2017-04-15","kouris":24.84,"asprokremmos":21.64,"evretou":11.56,"kannaviou":6.84,"germasoyeia":3.4,"totalAll":88.86},{"date":"2017-05-01","kouris":24.35,"asprokremmos":20.89,"evretou":11.4,"kannaviou":6.8,"germasoyeia":3.54,"totalAll":87.47},{"date":"2017-05-15","kouris":23.64,"asprokremmos":20.21,"evretou":11.16,"kannaviou":6.73,"germasoyeia":3.57,"totalAll":85.44},{"date":"2017-06-01","kouris":22.72,"asprokremmos":19.45,"evretou":10.9,"kannaviou":6.62,"germasoyeia":3.57,"totalAll":82.94},{"date":"2017-06-15","kouris":21.56,"asprokremmos":18.67,"evretou":10.59,"kannaviou":6.47,"germasoyeia":3.46,"totalAll":79.7},{"date":"2017-07-01","kouris":20.53,"asprokremmos":17.79,"evretou":10.2,"kannaviou":6.3,"germasoyeia":3.12,"totalAll":75.89},{"date":"2017-07-15","kouris":19.18,"asprokremmos":16.84,"evretou":9.82,"kannaviou":6.1,"germasoyeia":2.82,"totalAll":71.67},{"date":"2017-08-01","kouris":17.84,"asprokremmos":15.66,"evretou":9.38,"kannaviou":5.86,"germasoyeia":2.43,"totalAll":66.72},{"date":"2017-08-15","kouris":16.75,"asprokremmos":14.73,"evretou":9.03,"kannaviou":5.66,"germasoyeia":2.1,"totalAll":62.77},{"date":"2017-09-01","kouris":15.4,"asprokremmos":13.52,"evretou":8.57,"kannaviou":5.41,"germasoyeia":1.72,"totalAll":57.84},{"date":"2017-09-15","kouris":14.27,"asprokremmos":12.47,"evretou":8.16,"kannaviou":5.23,"germasoyeia":1.43,"totalAll":53.72},{"date":"2017-10-01","kouris":12.8,"asprokremmos":11.39,"evretou":7.75,"kannaviou":5.0,"germasoyeia":1.11,"totalAll":48.96},{"date":"2017-10-15","kouris":11.77,"asprokremmos":10.85,"evretou":7.47,"kannaviou":4.66,"germasoyeia":0.75,"totalAll":45.52},{"date":"2017-11-01","kouris":10.69,"asprokremmos":10.29,"evretou":7.22,"kannaviou":4.25,"germasoyeia":0.44,"totalAll":42.15},{"date":"2017-11-15","kouris":10.04,"asprokremmos":10.12,"evretou":7.16,"kannaviou":3.96,"germasoyeia":0.19,"totalAll":40.43},{"date":"2017-12-01","kouris":9.42,"asprokremmos":9.99,"evretou":7.1,"kannaviou":3.63,"germasoyeia":0.05,"totalAll":39.15},{"date":"2017-12-15","kouris":8.96,"asprokremmos":9.86,"evretou":7.01,"kannaviou":3.34,"germasoyeia":0.04,"totalAll":38.42},{"date":"2018-01-01","kouris":8.59,"asprokremmos":9.75,"evretou":6.95,"kannaviou":2.98,"germasoyeia":0.17,"totalAll":37.91},{"date":"2018-01-15","kouris":9.2,"asprokremmos":10.07,"evretou":7.02,"kannaviou":2.95,"germasoyeia":0.42,"totalAll":40.49},{"date":"2018-02-01","kouris":15.87,"asprokremmos":13.22,"evretou":9.11,"kannaviou":4.69,"germasoyeia":1.14,"totalAll":57.53},{"date":"2018-02-15","kouris":16.68,"asprokremmos":13.17,"evretou":9.44,"kannaviou":4.85,"germasoyeia":1.23,"totalAll":60.04},{"date":"2018-03-01","kouris":18.61,"asprokremmos":14.71,"evretou":10.01,"kannaviou":5.11,"germasoyeia":1.34,"totalAll":65.98},{"date":"2018-03-15","kouris":19.97,"asprokremmos":15.29,"evretou":10.37,"kannaviou":5.32,"germasoyeia":1.45,"totalAll":68.52},{"date":"2018-04-01","kouris":19.78,"asprokremmos":15.14,"evretou":10.39,"kannaviou":5.36,"germasoyeia":1.33,"totalAll":68.45},{"date":"2018-04-15","kouris":19.58,"asprokremmos":14.94,"evretou":10.39,"kannaviou":5.34,"germasoyeia":1.2,"totalAll":68.38},{"date":"2018-05-01","kouris":19.12,"asprokremmos":14.58,"evretou":10.19,"kannaviou":5.25,"germasoyeia":1.05,"totalAll":67.07},{"date":"2018-05-15","kouris":19.03,"asprokremmos":14.23,"evretou":10.04,"kannaviou":5.16,"germasoyeia":1.08,"totalAll":66.67},{"date":"2018-06-01","kouris":19.18,"asprokremmos":13.66,"evretou":9.79,"kannaviou":5.0,"germasoyeia":1.17,"totalAll":64.7},{"date":"2018-06-15","kouris":18.95,"asprokremmos":13.22,"evretou":9.58,"kannaviou":4.9,"germasoyeia":1.29,"totalAll":63.74},{"date":"2018-07-01","kouris":18.07,"asprokremmos":12.54,"evretou":9.22,"kannaviou":4.72,"germasoyeia":1.31,"totalAll":60.89},{"date":"2018-07-15","kouris":16.85,"asprokremmos":11.83,"evretou":8.01,"kannaviou":4.51,"germasoyeia":1.31,"totalAll":56.57},{"date":"2018-08-01","kouris":15.49,"asprokremmos":11.05,"evretou":8.41,"kannaviou":4.32,"germasoyeia":1.24,"totalAll":53.46},{"date":"2018-08-15","kouris":14.31,"asprokremmos":10.3,"evretou":8.07,"kannaviou":4.14,"germasoyeia":1.07,"totalAll":50.12},{"date":"2018-09-01","kouris":12.99,"asprokremmos":9.49,"evretou":7.64,"kannaviou":3.82,"germasoyeia":0.81,"totalAll":46.01},{"date":"2018-09-15","kouris":12.32,"asprokremmos":9.23,"evretou":7.26,"kannaviou":3.31,"germasoyeia":0.47,"totalAll":42.91},{"date":"2018-10-01","kouris":11.64,"asprokremmos":8.98,"evretou":6.83,"kannaviou":2.72,"germasoyeia":0.11,"totalAll":39.55},{"date":"2018-10-15","kouris":10.85,"asprokremmos":8.82,"evretou":6.54,"kannaviou":2.21,"germasoyeia":0.07,"totalAll":37.12},{"date":"2018-11-01","kouris":9.92,"asprokremmos":8.68,"evretou":6.37,"kannaviou":1.77,"germasoyeia":0.05,"totalAll":34.98},{"date":"2018-11-15","kouris":8.95,"asprokremmos":8.43,"evretou":6.26,"kannaviou":1.57,"germasoyeia":0.04,"totalAll":33.13},{"date":"2018-12-01","kouris":8.05,"asprokremmos":8.18,"evretou":6.16,"kannaviou":1.48,"germasoyeia":0.03,"totalAll":32.34},{"date":"2018-12-15","kouris":9.84,"asprokremmos":9.3,"evretou":6.34,"kannaviou":1.55,"germasoyeia":0.47,"totalAll":36.93},{"date":"2019-01-01","kouris":14.06,"asprokremmos":10.82,"evretou":7.5,"kannaviou":2.1,"germasoyeia":1.57,"totalAll":47.98},{"date":"2019-01-15","kouris":27.63,"asprokremmos":21.75,"evretou":11.08,"kannaviou":4.48,"germasoyeia":6.09,"totalAll":90.42},{"date":"2019-02-01","kouris":53.05,"asprokremmos":40.2,"evretou":16.77,"kannaviou":9.44,"germasoyeia":13.5,"totalAll":165.39},{"date":"2019-02-15","kouris":62.88,"asprokremmos":43.68,"evretou":17.83,"kannaviou":9.93,"germasoyeia":13.5,"totalAll":187.11},{"date":"2019-03-01","kouris":74.47,"asprokremmos":50.49,"evretou":20.2,"kannaviou":11.94,"germasoyeia":13.5,"totalAll":218.33},{"date":"2019-03-15","kouris":82.85,"asprokremmos":52.38,"evretou":22.13,"kannaviou":13.43,"germasoyeia":13.5,"totalAll":235.5},{"date":"2019-04-01","kouris":91.4,"asprokremmos":52.38,"evretou":23.15,"kannaviou":14.33,"germasoyeia":13.5,"totalAll":247.77},{"date":"2019-04-15","kouris":100.43,"asprokremmos":52.38,"evretou":24,"kannaviou":15.84,"germasoyeia":13.5,"totalAll":262.05},{"date":"2019-05-01","kouris":106.46,"asprokremmos":52.38,"evretou":24,"kannaviou":16.3,"germasoyeia":13.5,"totalAll":268.63},{"date":"2019-05-15","kouris":107.35,"asprokremmos":52.38,"evretou":23.98,"kannaviou":16.43,"germasoyeia":13.5,"totalAll":270.58},{"date":"2019-06-01","kouris":107.6,"asprokremmos":52.08,"evretou":23.52,"kannaviou":16.33,"germasoyeia":13.39,"totalAll":269.2},{"date":"2019-06-15","kouris":107.79,"asprokremmos":51.64,"evretou":23.15,"kannaviou":16.22,"germasoyeia":13.18,"totalAll":267.69},{"date":"2019-07-01","kouris":110.01,"asprokremmos":51.39,"evretou":22.68,"kannaviou":16.01,"germasoyeia":12.91,"totalAll":266.64},{"date":"2019-07-15","kouris":109.49,"asprokremmos":50.66,"evretou":22.16,"kannaviou":15.79,"germasoyeia":12.48,"totalAll":263.21},{"date":"2019-08-01","kouris":108.4,"asprokremmos":49.7,"evretou":21.55,"kannaviou":15.49,"germasoyeia":11.87,"totalAll":258.39},{"date":"2019-08-15","kouris":106.39,"asprokremmos":48.81,"evretou":21.0,"kannaviou":15.23,"germasoyeia":11.34,"totalAll":253.57},{"date":"2019-09-01","kouris":104.38,"asprokremmos":47.97,"evretou":20.42,"kannaviou":14.94,"germasoyeia":10.75,"totalAll":248.7},{"date":"2019-09-15","kouris":102.7,"asprokremmos":47.1,"evretou":19.8,"kannaviou":14.69,"germasoyeia":10.31,"totalAll":244.06},{"date":"2019-10-01","kouris":102.14,"asprokremmos":46.34,"evretou":19.33,"kannaviou":14.46,"germasoyeia":10.03,"totalAll":239.78},{"date":"2019-10-15","kouris":100.36,"asprokremmos":45.65,"evretou":18.96,"kannaviou":14.25,"germasoyeia":9.57,"totalAll":235.19},{"date":"2019-11-01","kouris":98.7,"asprokremmos":45.13,"evretou":18.8,"kannaviou":13.91,"germasoyeia":9.64,"totalAll":232.84},{"date":"2019-11-15","kouris":97.23,"asprokremmos":44.84,"evretou":18.51,"kannaviou":13.64,"germasoyeia":9.7,"totalAll":230.61},{"date":"2019-12-01","kouris":95.38,"asprokremmos":44.43,"evretou":18.23,"kannaviou":13.24,"germasoyeia":9.43,"totalAll":226.81},{"date":"2019-12-15","kouris":94.65,"asprokremmos":44.37,"evretou":18.09,"kannaviou":13.23,"germasoyeia":9.64,"totalAll":227.17},{"date":"2020-01-01","kouris":101.81,"asprokremmos":50.03,"evretou":20.15,"kannaviou":15.22,"germasoyeia":11.66,"totalAll":251.03},{"date":"2020-01-15","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":283.23},{"date":"2020-02-01","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":283.11},{"date":"2020-02-15","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":284.21},{"date":"2020-03-01","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":285.54},{"date":"2020-03-15","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":287.17},{"date":"2020-04-01","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.17,"germasoyeia":13.5,"totalAll":287.52},{"date":"2020-04-15","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.11,"germasoyeia":13.5,"totalAll":288.04},{"date":"2020-05-01","kouris":115,"asprokremmos":52.38,"evretou":24,"kannaviou":17.08,"germasoyeia":13.5,"totalAll":288.21},{"date":"2020-05-15","kouris":114.97,"asprokremmos":52.35,"evretou":23.95,"kannaviou":17.0,"germasoyeia":13.5,"totalAll":287.82},{"date":"2020-06-01","kouris":113.64,"asprokremmos":51.76,"evretou":23.56,"kannaviou":16.65,"germasoyeia":13.21,"totalAll":283.37},{"date":"2020-06-15","kouris":112.23,"asprokremmos":51.39,"evretou":23.16,"kannaviou":16.33,"germasoyeia":12.94,"totalAll":279.66},{"date":"2020-07-01","kouris":112.22,"asprokremmos":50.78,"evretou":22.61,"kannaviou":15.97,"germasoyeia":12.59,"totalAll":274.46},{"date":"2020-07-15","kouris":110.14,"asprokremmos":50.1,"evretou":22.14,"kannaviou":15.61,"germasoyeia":12.43,"totalAll":269.36},{"date":"2020-08-01","kouris":107.16,"asprokremmos":49.28,"evretou":21.55,"kannaviou":15.07,"germasoyeia":11.86,"totalAll":262.05},{"date":"2020-08-16","kouris":104.41,"asprokremmos":48.46,"evretou":20.96,"kannaviou":14.57,"germasoyeia":11.16,"totalAll":255.01},{"date":"2020-09-01","kouris":101.9,"asprokremmos":47.64,"evretou":20.47,"kannaviou":14.11,"germasoyeia":10.52,"totalAll":247.97},{"date":"2020-09-15","kouris":99.89,"asprokremmos":46.78,"evretou":20.02,"kannaviou":13.68,"germasoyeia":9.91,"totalAll":241.3},{"date":"2020-10-01","kouris":97.67,"asprokremmos":46.0,"evretou":19.41,"kannaviou":13.2,"germasoyeia":9.22,"totalAll":234.06},{"date":"2020-10-15","kouris":95.76,"asprokremmos":45.35,"evretou":18.86,"kannaviou":12.8,"germasoyeia":8.65,"totalAll":227.96},{"date":"2020-11-01","kouris":93.9,"asprokremmos":44.7,"evretou":18.31,"kannaviou":12.33,"germasoyeia":8.03,"totalAll":222.06},{"date":"2020-11-15","kouris":92.67,"asprokremmos":44.21,"evretou":18.09,"kannaviou":11.99,"germasoyeia":7.58,"totalAll":218.63},{"date":"2020-12-01","kouris":91.6,"asprokremmos":44.1,"evretou":17.94,"kannaviou":11.77,"germasoyeia":7.27,"totalAll":216.74},{"date":"2020-12-15","kouris":90.74,"asprokremmos":44.1,"evretou":17.82,"kannaviou":11.55,"germasoyeia":6.94,"totalAll":215.74},{"date":"2021-01-01","kouris":91.51,"asprokremmos":43.96,"evretou":17.67,"kannaviou":11.28,"germasoyeia":6.65,"totalAll":214.94},{"date":"2021-01-15","kouris":90.45,"asprokremmos":43.84,"evretou":17.58,"kannaviou":11.03,"germasoyeia":6.3,"totalAll":212.56},{"date":"2021-02-01","kouris":91.74,"asprokremmos":44.98,"evretou":18.11,"kannaviou":11.47,"germasoyeia":7.05,"totalAll":220.76},{"date":"2021-02-15","kouris":94.24,"asprokremmos":45.11,"evretou":18.4,"kannaviou":11.51,"germasoyeia":7.23,"totalAll":222.72},{"date":"2021-03-01","kouris":93.3,"asprokremmos":45.2,"evretou":18.38,"kannaviou":11.39,"germasoyeia":7.24,"totalAll":221.93},{"date":"2021-03-15","kouris":91.89,"asprokremmos":45.12,"evretou":18.35,"kannaviou":11.23,"germasoyeia":7.22,"totalAll":220.47},{"date":"2021-04-01","kouris":90.28,"asprokremmos":45.13,"evretou":18.36,"kannaviou":11.29,"germasoyeia":7.07,"totalAll":219.17},{"date":"2021-04-15","kouris":88.86,"asprokremmos":45.12,"evretou":18.36,"kannaviou":11.28,"germasoyeia":6.84,"totalAll":217.51},{"date":"2021-05-01","kouris":86.35,"asprokremmos":44.84,"evretou":18.09,"kannaviou":11.01,"germasoyeia":6.49,"totalAll":212.97},{"date":"2021-05-15","kouris":84.13,"asprokremmos":44.35,"evretou":17.72,"kannaviou":10.77,"germasoyeia":6.18,"totalAll":208.42},{"date":"2021-06-01","kouris":81.25,"asprokremmos":43.63,"evretou":17.22,"kannaviou":10.41,"germasoyeia":5.8,"totalAll":202.32},{"date":"2021-06-15","kouris":79.3,"asprokremmos":43.06,"evretou":16.81,"kannaviou":10.2,"germasoyeia":5.36,"totalAll":197.53},{"date":"2021-07-01","kouris":77.37,"asprokremmos":42.43,"evretou":16.36,"kannaviou":9.92,"germasoyeia":4.97,"totalAll":192.69},{"date":"2021-07-15","kouris":75.66,"asprokremmos":41.67,"evretou":15.93,"kannaviou":9.68,"germasoyeia":4.74,"totalAll":188.21},{"date":"2021-08-01","kouris":72.91,"asprokremmos":40.52,"evretou":15.29,"kannaviou":9.35,"germasoyeia":4.29,"totalAll":181.04},{"date":"2021-08-16","kouris":70.73,"asprokremmos":39.53,"evretou":14.73,"kannaviou":9.1,"germasoyeia":3.95,"totalAll":175.18},{"date":"2021-09-01","kouris":68.57,"asprokremmos":38.37,"evretou":14.14,"kannaviou":8.83,"germasoyeia":3.57,"totalAll":168.84},{"date":"2021-09-15","kouris":66.36,"asprokremmos":37.48,"evretou":13.55,"kannaviou":8.57,"germasoyeia":3.17,"totalAll":163.12},{"date":"2021-10-01","kouris":63.85,"asprokremmos":36.48,"evretou":13.1,"kannaviou":8.2,"germasoyeia":2.83,"totalAll":156.88},{"date":"2021-10-15","kouris":62.23,"asprokremmos":35.63,"evretou":12.71,"kannaviou":7.96,"germasoyeia":2.53,"totalAll":152.31},{"date":"2021-11-01","kouris":59.84,"asprokremmos":34.68,"evretou":12.31,"kannaviou":7.69,"germasoyeia":2.3,"totalAll":146.74},{"date":"2021-11-15","kouris":57.9,"asprokremmos":34.01,"evretou":12.12,"kannaviou":7.53,"germasoyeia":2.07,"totalAll":142.66},{"date":"2021-12-01","kouris":56.47,"asprokremmos":33.47,"evretou":11.88,"kannaviou":7.36,"germasoyeia":1.84,"totalAll":139.68},{"date":"2021-12-15","kouris":55.65,"asprokremmos":33.3,"evretou":11.81,"kannaviou":7.27,"germasoyeia":1.65,"totalAll":138.86},{"date":"2022-01-01","kouris":58.44,"asprokremmos":34.3,"evretou":12.06,"kannaviou":7.53,"germasoyeia":2.16,"totalAll":148.22},{"date":"2022-01-15","kouris":66.96,"asprokremmos":38.33,"evretou":13.34,"kannaviou":8.95,"germasoyeia":5.72,"totalAll":175.81},{"date":"2022-02-01","kouris":79.08,"asprokremmos":48.32,"evretou":17.88,"kannaviou":12.51,"germasoyeia":9.12,"totalAll":219.03},{"date":"2022-02-15","kouris":85.3,"asprokremmos":52.38,"evretou":19.85,"kannaviou":14.9,"germasoyeia":10.91,"totalAll":241.57},{"date":"2022-03-01","kouris":89.17,"asprokremmos":52.38,"evretou":20.71,"kannaviou":15.48,"germasoyeia":11.9,"totalAll":248.67},{"date":"2022-03-15","kouris":93.51,"asprokremmos":52.38,"evretou":21.95,"kannaviou":16.77,"germasoyeia":12.52,"totalAll":256.72},{"date":"2022-04-01","kouris":95.5,"asprokremmos":52.38,"evretou":22.88,"kannaviou":17.17,"germasoyeia":13.11,"totalAll":262.02},{"date":"2022-04-15","kouris":96.39,"asprokremmos":52.28,"evretou":22.98,"kannaviou":17.09,"germasoyeia":13.36,"totalAll":263.15},{"date":"2022-05-01","kouris":95.15,"asprokremmos":51.96,"evretou":22.86,"kannaviou":16.91,"germasoyeia":13.45,"totalAll":261.35},{"date":"2022-05-15","kouris":93.89,"asprokremmos":51.5,"evretou":22.67,"kannaviou":16.68,"germasoyeia":13.37,"totalAll":258.79},{"date":"2022-06-01","kouris":91.86,"asprokremmos":50.81,"evretou":22.3,"kannaviou":16.31,"germasoyeia":13.21,"totalAll":254.21},{"date":"2022-06-15","kouris":89.8,"asprokremmos":50.22,"evretou":21.83,"kannaviou":15.93,"germasoyeia":12.91,"totalAll":249.74},{"date":"2022-07-01","kouris":87.1,"asprokremmos":49.43,"evretou":21.27,"kannaviou":15.51,"germasoyeia":12.62,"totalAll":244.06},{"date":"2022-07-15","kouris":85.66,"asprokremmos":48.7,"evretou":20.79,"kannaviou":15.16,"germasoyeia":12.34,"totalAll":238.94},{"date":"2022-08-01","kouris":83.79,"asprokremmos":47.66,"evretou":20.19,"kannaviou":14.71,"germasoyeia":11.89,"totalAll":232.3},{"date":"2022-08-15","kouris":82.56,"asprokremmos":46.73,"evretou":19.58,"kannaviou":14.31,"germasoyeia":11.55,"totalAll":226.83},{"date":"2022-09-01","kouris":81.09,"asprokremmos":45.75,"evretou":18.89,"kannaviou":13.91,"germasoyeia":10.97,"totalAll":220.62},{"date":"2022-09-15","kouris":79.8,"asprokremmos":45.0,"evretou":18.42,"kannaviou":13.58,"germasoyeia":10.55,"totalAll":215.43},{"date":"2022-10-01","kouris":77.81,"asprokremmos":44.01,"evretou":17.87,"kannaviou":13.28,"germasoyeia":9.97,"totalAll":208.7},{"date":"2022-10-15","kouris":76.19,"asprokremmos":43.22,"evretou":17.46,"kannaviou":13.01,"germasoyeia":9.74,"totalAll":203.51},{"date":"2022-11-01","kouris":77.53,"asprokremmos":43.19,"evretou":17.2,"kannaviou":12.69,"germasoyeia":9.91,"totalAll":202.47},{"date":"2022-11-15","kouris":76.68,"asprokremmos":42.78,"evretou":17.06,"kannaviou":12.45,"germasoyeia":9.94,"totalAll":200.09},{"date":"2022-12-01","kouris":75.15,"asprokremmos":42.47,"evretou":16.91,"kannaviou":12.28,"germasoyeia":9.79,"totalAll":197.61},{"date":"2022-12-15","kouris":73.82,"asprokremmos":42.17,"evretou":16.78,"kannaviou":12.08,"germasoyeia":9.64,"totalAll":195.41},{"date":"2023-01-01","kouris":72.38,"asprokremmos":41.67,"evretou":16.69,"kannaviou":11.88,"germasoyeia":9.57,"totalAll":193.58},{"date":"2023-01-15","kouris":71.81,"asprokremmos":41.37,"evretou":16.59,"kannaviou":11.81,"germasoyeia":10.31,"totalAll":194.83},{"date":"2023-02-01","kouris":72.4,"asprokremmos":40.94,"evretou":16.51,"kannaviou":11.65,"germasoyeia":10.61,"totalAll":195.24},{"date":"2023-02-15","kouris":72.5,"asprokremmos":42.38,"evretou":17.15,"kannaviou":12.04,"germasoyeia":11.34,"totalAll":201.68},{"date":"2023-03-01","kouris":72.16,"asprokremmos":42.15,"evretou":17.18,"kannaviou":11.98,"germasoyeia":11.53,"totalAll":200.62},{"date":"2023-03-15","kouris":72.7,"asprokremmos":41.78,"evretou":17.08,"kannaviou":11.86,"germasoyeia":11.72,"totalAll":199.84},{"date":"2023-04-01","kouris":74.32,"asprokremmos":42.3,"evretou":17.6,"kannaviou":12.25,"germasoyeia":11.9,"totalAll":202.26},{"date":"2023-04-15","kouris":73.77,"asprokremmos":42.08,"evretou":17.54,"kannaviou":12.24,"germasoyeia":11.82,"totalAll":200.78},{"date":"2023-05-01","kouris":72.92,"asprokremmos":41.78,"evretou":17.39,"kannaviou":12.18,"germasoyeia":11.77,"totalAll":198.24},{"date":"2023-05-15","kouris":71.74,"asprokremmos":41.43,"evretou":17.23,"kannaviou":12.08,"germasoyeia":11.55,"totalAll":194.98},{"date":"2023-06-01","kouris":70.49,"asprokremmos":40.79,"evretou":16.98,"kannaviou":11.93,"germasoyeia":11.33,"totalAll":191.47},{"date":"2023-06-15","kouris":69.26,"asprokremmos":40.22,"evretou":16.67,"kannaviou":11.78,"germasoyeia":11.1,"totalAll":188.56},{"date":"2023-07-01","kouris":67.72,"asprokremmos":39.51,"evretou":16.24,"kannaviou":11.59,"germasoyeia":10.79,"totalAll":184.72},{"date":"2023-07-15","kouris":65.94,"asprokremmos":38.68,"evretou":15.8,"kannaviou":11.35,"germasoyeia":10.48,"totalAll":180.18},{"date":"2023-08-01","kouris":62.92,"asprokremmos":36.84,"evretou":14.93,"kannaviou":10.93,"germasoyeia":9.97,"totalAll":171.52},{"date":"2023-08-15","kouris":60.85,"asprokremmos":35.75,"evretou":14.35,"kannaviou":10.66,"germasoyeia":9.62,"totalAll":165.84},{"date":"2023-09-01","kouris":58.66,"asprokremmos":34.6,"evretou":13.84,"kannaviou":10.37,"germasoyeia":9.32,"totalAll":160.27},{"date":"2023-09-15","kouris":56.32,"asprokremmos":33.37,"evretou":13.32,"kannaviou":10.0,"germasoyeia":8.97,"totalAll":154.06},{"date":"2023-10-01","kouris":54.24,"asprokremmos":32.25,"evretou":12.98,"kannaviou":9.74,"germasoyeia":8.74,"totalAll":148.79},{"date":"2023-10-15","kouris":52.61,"asprokremmos":31.7,"evretou":12.76,"kannaviou":9.56,"germasoyeia":8.41,"totalAll":145.11},{"date":"2023-11-01","kouris":50.63,"asprokremmos":30.83,"evretou":12.5,"kannaviou":9.26,"germasoyeia":7.89,"totalAll":140.39},{"date":"2023-11-15","kouris":49.43,"asprokremmos":30.3,"evretou":12.32,"kannaviou":9.08,"germasoyeia":7.51,"totalAll":137.28},{"date":"2023-12-01","kouris":48.23,"asprokremmos":29.77,"evretou":12.15,"kannaviou":8.92,"germasoyeia":7.28,"totalAll":135.23},{"date":"2023-12-15","kouris":47.35,"asprokremmos":29.4,"evretou":12.03,"kannaviou":8.82,"germasoyeia":7.15,"totalAll":133.97},{"date":"2024-01-01","kouris":46.16,"asprokremmos":29.16,"evretou":11.9,"kannaviou":8.77,"germasoyeia":6.83,"totalAll":132.39},{"date":"2024-01-15","kouris":45.03,"asprokremmos":29.11,"evretou":11.98,"kannaviou":8.81,"germasoyeia":6.61,"totalAll":131.62},{"date":"2024-02-01","kouris":47.15,"asprokremmos":29.54,"evretou":12.51,"kannaviou":9.25,"germasoyeia":6.7,"totalAll":135.46},{"date":"2024-02-15","kouris":47.95,"asprokremmos":29.71,"evretou":12.99,"kannaviou":9.59,"germasoyeia":6.77,"totalAll":138.07},{"date":"2024-03-01","kouris":47.91,"asprokremmos":29.64,"evretou":13.14,"kannaviou":9.62,"germasoyeia":6.74,"totalAll":139.23},{"date":"2024-03-15","kouris":47.07,"asprokremmos":29.21,"evretou":13.14,"kannaviou":9.57,"germasoyeia":6.7,"totalAll":137.93},{"date":"2024-04-01","kouris":46.54,"asprokremmos":28.76,"evretou":13.03,"kannaviou":9.5,"germasoyeia":6.65,"totalAll":136.63},{"date":"2024-04-15","kouris":45.36,"asprokremmos":28.12,"evretou":12.81,"kannaviou":9.35,"germasoyeia":6.51,"totalAll":133.98},{"date":"2024-05-01","kouris":44.27,"asprokremmos":27.44,"evretou":12.54,"kannaviou":9.18,"germasoyeia":6.42,"totalAll":130.7},{"date":"2024-05-15","kouris":43.56,"asprokremmos":26.86,"evretou":12.26,"kannaviou":9.01,"germasoyeia":6.36,"totalAll":128.15},{"date":"2024-06-01","kouris":42.14,"asprokremmos":25.97,"evretou":11.76,"kannaviou":8.74,"germasoyeia":5.95,"totalAll":123.27},{"date":"2024-06-15","kouris":40.94,"asprokremmos":25.14,"evretou":11.3,"kannaviou":8.51,"germasoyeia":5.64,"totalAll":118.53},{"date":"2024-07-01","kouris":39.87,"asprokremmos":24.07,"evretou":10.83,"kannaviou":8.22,"germasoyeia":5.34,"totalAll":113.8},{"date":"2024-07-15","kouris":38.6,"asprokremmos":23.17,"evretou":10.3,"kannaviou":7.96,"germasoyeia":5.01,"totalAll":109.36},{"date":"2024-08-01","kouris":37.25,"asprokremmos":22.22,"evretou":9.78,"kannaviou":7.69,"germasoyeia":4.73,"totalAll":104.79},{"date":"2024-08-15","kouris":35.31,"asprokremmos":21.03,"evretou":9.16,"kannaviou":7.3,"germasoyeia":4.36,"totalAll":98.76},{"date":"2024-09-01","kouris":33.7,"asprokremmos":19.86,"evretou":8.38,"kannaviou":6.92,"germasoyeia":3.95,"totalAll":93.08},{"date":"2024-09-15","kouris":32.25,"asprokremmos":19.0,"evretou":7.75,"kannaviou":6.64,"germasoyeia":3.66,"totalAll":88.81},{"date":"2024-10-01","kouris":30.36,"asprokremmos":17.86,"evretou":7.08,"kannaviou":6.3,"germasoyeia":3.28,"totalAll":83.72},{"date":"2024-10-15","kouris":28.83,"asprokremmos":16.96,"evretou":6.53,"kannaviou":6.02,"germasoyeia":3.03,"totalAll":79.56},{"date":"2024-11-01","kouris":26.82,"asprokremmos":15.97,"evretou":5.95,"kannaviou":5.71,"germasoyeia":2.76,"totalAll":74.67},{"date":"2024-11-15","kouris":26.05,"asprokremmos":15.72,"evretou":5.73,"kannaviou":5.51,"germasoyeia":2.65,"totalAll":73.22},{"date":"2024-12-01","kouris":25.82,"asprokremmos":15.51,"evretou":5.65,"kannaviou":5.4,"germasoyeia":2.77,"totalAll":73.62},{"date":"2024-12-15","kouris":25.56,"asprokremmos":15.38,"evretou":5.61,"kannaviou":5.27,"germasoyeia":3.05,"totalAll":73.95},{"date":"2025-01-01","kouris":25.48,"asprokremmos":15.32,"evretou":5.66,"kannaviou":5.18,"germasoyeia":3.37,"totalAll":75.8},{"date":"2025-01-15","kouris":25.37,"asprokremmos":15.08,"evretou":5.87,"kannaviou":5.12,"germasoyeia":3.76,"totalAll":77.38},{"date":"2025-02-01","kouris":25.07,"asprokremmos":14.8,"evretou":5.96,"kannaviou":4.98,"germasoyeia":3.79,"totalAll":75.91},{"date":"2025-02-15","kouris":24.79,"asprokremmos":14.5,"evretou":6.07,"kannaviou":4.89,"germasoyeia":3.77,"totalAll":75.61},{"date":"2025-03-01","kouris":24.3,"asprokremmos":14.14,"evretou":6.19,"kannaviou":4.8,"germasoyeia":3.73,"totalAll":74.6},{"date":"2025-03-17","kouris":23.78,"asprokremmos":13.68,"evretou":6.13,"kannaviou":4.68,"germasoyeia":3.66,"totalAll":78.8},{"date":"2025-03-28","kouris":22.64,"asprokremmos":13.27,"evretou":5.97,"kannaviou":4.55,"germasoyeia":3.55,"totalAll":76.43},{"date":"2025-04-11","kouris":22.29,"asprokremmos":12.86,"evretou":5.83,"kannaviou":4.42,"germasoyeia":3.47,"totalAll":74.95},{"date":"2025-04-28","kouris":21.88,"asprokremmos":12.36,"evretou":5.68,"kannaviou":4.27,"germasoyeia":3.32,"totalAll":72.73},{"date":"2025-05-09","kouris":21.57,"asprokremmos":12.07,"evretou":5.61,"kannaviou":4.16,"germasoyeia":3.2,"totalAll":71.39},{"date":"2025-05-16","kouris":21.31,"asprokremmos":11.86,"evretou":5.54,"kannaviou":4.1,"germasoyeia":3.12,"totalAll":70.31},{"date":"2025-05-23","kouris":21.01,"asprokremmos":11.57,"evretou":5.45,"kannaviou":4.02,"germasoyeia":3.04,"totalAll":68.9},{"date":"2025-06-02","kouris":20.66,"asprokremmos":11.19,"evretou":5.31,"kannaviou":3.92,"germasoyeia":2.91,"totalAll":67.08},{"date":"2025-06-06","kouris":20.53,"asprokremmos":11.04,"evretou":5.25,"kannaviou":3.87,"germasoyeia":2.85,"totalAll":66.33},{"date":"2025-06-10","kouris":20.4,"asprokremmos":10.88,"evretou":5.21,"kannaviou":3.83,"germasoyeia":2.8,"totalAll":65.62},{"date":"2025-06-17","kouris":20.06,"asprokremmos":10.62,"evretou":5.11,"kannaviou":3.75,"germasoyeia":2.71,"totalAll":64.15},{"date":"2025-06-27","kouris":19.21,"asprokremmos":10.19,"evretou":4.95,"kannaviou":3.64,"germasoyeia":2.55,"totalAll":61.73},{"date":"2025-07-04","kouris":18.8,"asprokremmos":9.88,"evretou":4.82,"kannaviou":3.55,"germasoyeia":2.42,"totalAll":60.05},{"date":"2025-07-18","kouris":18.05,"asprokremmos":9.21,"evretou":4.56,"kannaviou":3.35,"germasoyeia":2.19,"totalAll":56.67},{"date":"2025-07-28","kouris":17.26,"asprokremmos":8.76,"evretou":4.35,"kannaviou":3.2,"germasoyeia":1.98,"totalAll":54.16},{"date":"2025-08-08","kouris":16.49,"asprokremmos":8.23,"evretou":4.15,"kannaviou":3.04,"germasoyeia":1.79,"totalAll":51.73},{"date":"2025-08-25","kouris":15.37,"asprokremmos":7.3,"evretou":3.82,"kannaviou":2.8,"germasoyeia":1.48,"totalAll":47.65},{"date":"2025-09-01","kouris":14.88,"asprokremmos":6.96,"evretou":3.69,"kannaviou":2.7,"germasoyeia":1.36,"totalAll":46.03},{"date":"2025-09-22","kouris":13.52,"asprokremmos":5.87,"evretou":3.28,"kannaviou":2.4,"germasoyeia":1.12,"totalAll":41.4},{"date":"2025-10-10","kouris":12.47,"asprokremmos":5.3,"evretou":2.96,"kannaviou":2.19,"germasoyeia":0.95,"totalAll":38.07},{"date":"2025-10-13","kouris":12.3,"asprokremmos":5.21,"evretou":2.94,"kannaviou":2.16,"germasoyeia":0.92,"totalAll":37.58},{"date":"2025-10-27","kouris":11.38,"asprokremmos":4.85,"evretou":2.75,"kannaviou":2.01,"germasoyeia":0.77,"totalAll":35.16},{"date":"2025-11-03","kouris":11.02,"asprokremmos":4.68,"evretou":2.68,"kannaviou":1.93,"germasoyeia":0.69,"totalAll":34.17},{"date":"2025-11-10","kouris":10.57,"asprokremmos":4.49,"evretou":2.62,"kannaviou":1.86,"germasoyeia":0.62,"totalAll":33.09},{"date":"2025-11-18","kouris":10.2,"asprokremmos":4.43,"evretou":2.56,"kannaviou":1.79,"germasoyeia":0.56,"totalAll":32.31},{"date":"2025-11-24","kouris":9.9,"asprokremmos":4.33,"evretou":2.5,"kannaviou":1.74,"germasoyeia":0.5,"totalAll":31.66},{"date":"2025-12-05","kouris":9.31,"asprokremmos":4.12,"evretou":2.45,"kannaviou":1.68,"germasoyeia":0.4,"totalAll":30.66},{"date":"2025-12-11","kouris":9.08,"asprokremmos":4.07,"evretou":2.47,"kannaviou":1.64,"germasoyeia":0.36,"totalAll":30.92},{"date":"2025-12-15","kouris":9.01,"asprokremmos":4.01,"evretou":2.47,"kannaviou":1.61,"germasoyeia":0.33,"totalAll":30.91},{"date":"2025-12-23","kouris":8.73,"asprokremmos":3.9,"evretou":2.46,"kannaviou":1.58,"germasoyeia":0.25,"totalAll":30.62},{"date":"2025-12-29","kouris":9.15,"asprokremmos":3.83,"evretou":2.46,"kannaviou":1.55,"germasoyeia":0.21,"totalAll":30.49},{"date":"2026-01-05","kouris":9.71,"asprokremmos":3.95,"evretou":2.56,"kannaviou":1.58,"germasoyeia":0.17,"totalAll":31.11},{"date":"2026-01-12","kouris":10.91,"asprokremmos":4.0,"evretou":2.64,"kannaviou":1.62,"germasoyeia":0.15,"totalAll":32.84},{"date":"2026-01-19","kouris":10.94,"asprokremmos":5.01,"evretou":3.14,"kannaviou":2.02,"germasoyeia":0.14,"totalAll":35.81},{"date":"2026-01-26","kouris":11.58,"asprokremmos":5.55,"evretou":3.49,"kannaviou":2.18,"germasoyeia":0.15,"totalAll":39.44},{"date":"2026-02-02","kouris":13.08,"asprokremmos":6.14,"evretou":4.0,"kannaviou":2.66,"germasoyeia":0.32,"totalAll":43.73},{"date":"2026-02-09","kouris":14.0,"asprokremmos":6.53,"evretou":4.29,"kannaviou":2.79,"germasoyeia":0.44,"totalAll":46.09},{"date":"2026-02-16","kouris":16.66,"asprokremmos":9.44,"evretou":5.11,"kannaviou":3.63,"germasoyeia":0.96,"totalAll":56.93},{"date":"2026-02-20","kouris":19.34,"asprokremmos":10.45,"evretou":5.58,"kannaviou":4.11,"germasoyeia":1.14,"totalAll":61.49},{"date":"2026-02-24","kouris":20.42,"asprokremmos":11.03,"evretou":5.93,"kannaviou":4.36,"germasoyeia":1.36,"totalAll":64.9},{"date":"2026-02-25","kouris":20.7,"asprokremmos":11.09,"evretou":5.98,"kannaviou":4.39,"germasoyeia":1.4,"totalAll":65.49},{"date":"2026-02-27","kouris":21.09,"asprokremmos":11.24,"evretou":6.08,"kannaviou":4.45,"germasoyeia":1.44,"totalAll":66.44},{"date":"2026-03-02","kouris":21.69,"asprokremmos":11.33,"evretou":6.19,"kannaviou":4.52,"germasoyeia":1.58,"totalAll":67.49},{"date":"2026-03-04","kouris":21.97,"asprokremmos":11.4,"evretou":6.26,"kannaviou":4.54,"germasoyeia":1.6,"totalAll":68.03},{"date":"2026-03-06","kouris":22.16,"asprokremmos":11.46,"evretou":6.3,"kannaviou":4.57,"germasoyeia":1.6,"totalAll":68.5},{"date":"2026-03-09","kouris":22.29,"asprokremmos":11.51,"evretou":6.37,"kannaviou":4.59,"germasoyeia":1.6,"totalAll":68.99},{"date":"2026-03-11","kouris":22.41,"asprokremmos":11.51,"evretou":6.41,"kannaviou":4.6,"germasoyeia":1.59,"totalAll":69.21},{"date":"2026-03-13","kouris":22.53,"asprokremmos":11.51,"evretou":6.43,"kannaviou":4.61,"germasoyeia":1.59,"totalAll":69.41},{"date":"2026-03-16","kouris":22.98,"asprokremmos":11.72,"evretou":6.66,"kannaviou":4.76,"germasoyeia":1.64,"totalAll":71.39},{"date":"2026-03-18","kouris":23.41,"asprokremmos":12.0,"evretou":6.88,"kannaviou":4.91,"germasoyeia":1.77,"totalAll":72.93},{"date":"2026-03-20","kouris":24.37,"asprokremmos":12.22,"evretou":7.01,"kannaviou":5.03,"germasoyeia":1.91,"totalAll":74.47},{"date":"2026-03-23","kouris":27.92,"asprokremmos":15.42,"evretou":8.13,"kannaviou":6.35,"germasoyeia":3.02,"totalAll":86.92},{"date":"2026-03-24","kouris":28.85,"asprokremmos":15.95,"evretou":8.44,"kannaviou":6.62,"germasoyeia":3.25,"totalAll":89.49},{"date":"2026-03-26","kouris":30.94,"asprokremmos":16.74,"evretou":8.94,"kannaviou":7.04,"germasoyeia":3.85,"totalAll":94.36},{"date":"2026-03-27","kouris":31.77,"asprokremmos":17.07,"evretou":9.12,"kannaviou":7.21,"germasoyeia":4.07,"totalAll":96.18},{"date":"2026-03-30","kouris":33.48,"asprokremmos":17.73,"evretou":9.48,"kannaviou":7.52,"germasoyeia":4.46,"totalAll":99.95},{"date":"2026-03-31","kouris":33.81,"asprokremmos":17.88,"evretou":9.6,"kannaviou":7.59,"germasoyeia":4.58,"totalAll":100.97},{"date":"2026-04-02","kouris":34.45,"asprokremmos":18.16,"evretou":9.76,"kannaviou":7.74,"germasoyeia":4.8,"totalAll":102.8},{"date":"2026-04-03","kouris":35.01,"asprokremmos":18.3,"evretou":9.83,"kannaviou":7.78,"germasoyeia":5.08,"totalAll":104.34},{"date":"2026-04-06","kouris":36.21,"asprokremmos":18.86,"evretou":10.05,"kannaviou":7.93,"germasoyeia":5.57,"totalAll":107.95},{"date":"2026-04-07","kouris":36.69,"asprokremmos":19.02,"evretou":10.13,"kannaviou":7.97,"germasoyeia":5.76,"totalAll":109.42},{"date":"2026-04-08","kouris":37.14,"asprokremmos":19.15,"evretou":10.2,"kannaviou":8.01,"germasoyeia":5.95,"totalAll":110.75},{"date":"2026-04-09","kouris":37.51,"asprokremmos":19.27,"evretou":10.28,"kannaviou":8.05,"germasoyeia":6.09,"totalAll":111.72},{"date":"2026-04-15","kouris":39.33,"asprokremmos":19.78,"evretou":10.55,"kannaviou":8.22,"germasoyeia":6.66,"totalAll":116.41},{"date":"2026-04-16","kouris":39.55,"asprokremmos":19.85,"evretou":10.59,"kannaviou":8.23,"germasoyeia":6.73,"totalAll":116.96},{"date":"2026-04-20","kouris":41.24,"asprokremmos":20.21,"evretou":10.76,"kannaviou":8.32,"germasoyeia":7.04,"totalAll":119.48},{"date":"2026-04-21","kouris":41.48,"asprokremmos":20.29,"evretou":10.81,"kannaviou":8.33,"germasoyeia":7.07,"totalAll":120.02},{"date":"2026-04-22","kouris":41.68,"asprokremmos":20.34,"evretou":10.85,"kannaviou":8.34,"germasoyeia":7.1,"totalAll":120.44},{"date":"2026-04-23","kouris":41.87,"asprokremmos":20.38,"evretou":10.89,"kannaviou":8.36,"germasoyeia":7.13,"totalAll":120.82},{"date":"2026-04-24","kouris":41.99,"asprokremmos":20.41,"evretou":10.91,"kannaviou":8.38,"germasoyeia":7.17,"totalAll":121.16},{"date":"2026-04-27","kouris":42.38,"asprokremmos":20.48,"evretou":10.99,"kannaviou":8.4,"germasoyeia":7.31,"totalAll":122.21},{"date":"2026-04-28","kouris":42.47,"asprokremmos":20.5,"evretou":11.02,"kannaviou":8.42,"germasoyeia":7.36,"totalAll":122.51},{"date":"2026-04-29","kouris":42.62,"asprokremmos":20.55,"evretou":11.04,"kannaviou":8.42,"germasoyeia":7.44,"totalAll":122.94},{"date":"2026-04-30","kouris":42.71,"asprokremmos":20.57,"evretou":11.06,"kannaviou":8.42,"germasoyeia":7.5,"totalAll":123.23},{"date":"2026-05-04","kouris":43.04,"asprokremmos":20.76,"evretou":11.17,"kannaviou":8.49,"germasoyeia":7.62,"totalAll":124.49},{"date":"2026-05-05","kouris":43.39,"asprokremmos":20.98,"evretou":11.35,"kannaviou":8.61,"germasoyeia":7.66,"totalAll":125.82},{"date":"2026-05-06","kouris":43.65,"asprokremmos":21.14,"evretou":11.44,"kannaviou":8.68,"germasoyeia":7.69,"totalAll":126.68},{"date":"2026-05-07","kouris":43.83,"asprokremmos":21.24,"evretou":11.54,"kannaviou":8.73,"germasoyeia":7.72,"totalAll":127.31},{"date":"2026-05-08","kouris":43.97,"asprokremmos":21.3,"evretou":11.6,"kannaviou":8.76,"germasoyeia":7.75,"totalAll":127.77},{"date":"2026-05-11","kouris":44.43,"asprokremmos":21.44,"evretou":11.7,"kannaviou":8.84,"germasoyeia":7.82,"totalAll":128.8},{"date":"2026-05-12","kouris":44.53,"asprokremmos":21.49,"evretou":11.73,"kannaviou":8.86,"germasoyeia":7.84,"totalAll":129.06},{"date":"2026-05-20","kouris":47.17,"asprokremmos":21.78,"evretou":11.91,"kannaviou":8.94,"germasoyeia":8.0,"totalAll":130.85},{"date":"2026-05-21","kouris":47.22,"asprokremmos":21.82,"evretou":11.94,"kannaviou":8.95,"germasoyeia":8.02,"totalAll":131.06},{"date":"2026-05-22","kouris":47.28,"asprokremmos":21.86,"evretou":11.95,"kannaviou":8.96,"germasoyeia":8.05,"totalAll":131.32},{"date":"2026-05-26","kouris":47.57,"asprokremmos":21.97,"evretou":12.03,"kannaviou":8.98,"germasoyeia":8.12,"totalAll":132.15},{"date":"2026-05-27","kouris":47.63,"asprokremmos":21.98,"evretou":12.04,"kannaviou":8.98,"germasoyeia":8.12,"totalAll":132.27},{"date":"2026-05-28","kouris":47.7,"asprokremmos":22.0,"evretou":12.03,"kannaviou":8.99,"germasoyeia":8.13,"totalAll":132.4},{"date":"2026-05-29","kouris":47.78,"asprokremmos":22.01,"evretou":12.02,"kannaviou":8.98,"germasoyeia":8.14,"totalAll":132.5},{"date":"2026-06-02","kouris":47.95,"asprokremmos":21.97,"evretou":12.03,"kannaviou":8.97,"germasoyeia":8.13,"totalAll":132.65},{"date":"2026-06-03","kouris":47.95,"asprokremmos":21.97,"evretou":12.03,"kannaviou":8.97,"germasoyeia":8.13,"totalAll":132.65},{"date":"2026-06-04","kouris":48.04,"asprokremmos":21.94,"evretou":12.04,"kannaviou":8.97,"germasoyeia":8.12,"totalAll":132.69},{"date":"2026-06-05","kouris":48.06,"asprokremmos":21.92,"evretou":12.04,"kannaviou":8.97,"germasoyeia":8.12,"totalAll":132.66}],"inflow":[{"year":"15/16","months":{"October":1.024,"November":0.608,"December":1.248,"January":3.685,"February":2.824,"March":6.132,"April":1.314,"May":0.961,"June":0.105,"July":0.0,"Aug-Sep":0.006},"total":17.907},{"year":"16/17","months":{"October":0.247,"November":0.657,"December":7.424,"January":21.083,"February":4.181,"March":8.891,"April":4.398,"May":1.78,"June":0.228,"July":0.0,"Aug-Sep":0.0},"total":48.889},{"year":"17/18","months":{"October":0.142,"November":0.614,"December":0.881,"January":20.661,"February":9.528,"March":5.944,"April":2.176,"May":2.802,"June":2.022,"July":0.05,"Aug-Sep":0.077},"total":44.897},{"year":"18/19","months":{"October":0.858,"November":0.757,"December":16.665,"January":118.11,"February":53.909,"March":32.283,"April":25.326,"May":8.869,"June":6.199,"July":1.524,"Aug-Sep":0.542},"total":265.042},{"year":"19/20","months":{"October":2.43,"November":1.545,"December":30.495,"January":47.74,"February":15.916,"March":15.67,"April":11.062,"May":7.317,"June":2.747,"July":0.866,"Aug-Sep":0.161},"total":135.949},{"year":"20/21","months":{"October":0.165,"November":0.942,"December":3.107,"January":12.54,"February":8.016,"March":6.022,"April":4.156,"May":0.899,"June":0.192,"July":0.024,"Aug-Sep":0.035},"total":36.098},{"year":"21/22","months":{"October":0.084,"November":0.397,"December":11.923,"January":74.614,"February":33.963,"March":19.801,"April":8.139,"May":3.44,"June":1.264,"July":0.093,"Aug-Sep":0.035},"total":153.753},{"year":"22/23","months":{"October":3.946,"November":2.976,"December":2.922,"January":8.268,"February":12.603,"March":9.517,"April":4.741,"May":2.728,"June":0.891,"July":0.0,"Aug-Sep":0.186},"total":48.778},{"year":"23/24","months":{"October":0.583,"November":1.581,"December":2.34,"January":7.3,"February":6.676,"March":2.92,"April":1.801,"May":0.91,"June":0.297,"July":0.098,"Aug-Sep":0.208},"total":24.714},{"year":"24/25","months":{"October":0.0,"November":3.084,"December":5.71,"January":4.062,"February":2.451,"March":1.465,"April":1.096,"May":0.716,"June":0.076,"July":0.0,"Aug-Sep":0.004},"total":18.664},{"year":"25/26","months":{"October":0.095,"November":0.2,"December":1.903,"January":12.67,"February":24.201,"March":35.414,"April":23.609,"May":13.221,"June":0.685,"July":0.0,"Aug-Sep":0.0},"total":111.998}],"reservoirs":[{"name":"Kouris","capacity":115.0,"region":"Southern Conveyor","curPct":41.8,"curMCM":48.06,"lyPct":17.9,"lyMCM":20.564,"inflowOct":24.478},{"name":"Kalavasos","capacity":17.1,"region":"Southern Conveyor","curPct":24.6,"curMCM":4.213,"lyPct":23.2,"lyMCM":3.96,"inflowOct":4.109},{"name":"Lefkara","capacity":13.85,"region":"Southern Conveyor","curPct":18.5,"curMCM":2.561,"lyPct":17.1,"lyMCM":2.37,"inflowOct":1.697},{"name":"Dipotamos","capacity":15.5,"region":"Southern Conveyor","curPct":38.2,"curMCM":5.92,"lyPct":38.2,"lyMCM":5.915,"inflowOct":3.692},{"name":"Germasoyeia","capacity":13.5,"region":"Southern Conveyor","curPct":60.1,"curMCM":8.117,"lyPct":21.3,"lyMCM":2.871,"inflowOct":8.801},{"name":"Arminou","capacity":4.3,"region":"Southern Conveyor","curPct":46.3,"curMCM":1.992,"lyPct":61.8,"lyMCM":2.656,"inflowOct":21.252},{"name":"Polemidia","capacity":3.4,"region":"Southern Conveyor","curPct":60.8,"curMCM":2.068,"lyPct":34.8,"lyMCM":1.183,"inflowOct":1.619},{"name":"Achna","capacity":6.8,"region":"Southern Conveyor","curPct":2.0,"curMCM":0.133,"lyPct":7.2,"lyMCM":0.491,"inflowOct":0.0},{"name":"Asprokremmos","capacity":52.375,"region":"Paphos","curPct":41.9,"curMCM":21.924,"lyPct":21.1,"lyMCM":11.076,"inflowOct":20.142},{"name":"Kannaviou","capacity":17.168,"region":"Paphos","curPct":52.2,"curMCM":8.966,"lyPct":22.6,"lyMCM":3.883,"inflowOct":9.442},{"name":"Mavrokolympos","capacity":2.18,"region":"Paphos","curPct":86.2,"curMCM":1.879,"lyPct":0.0,"lyMCM":0.0,"inflowOct":0.951},{"name":"Evretou","capacity":24.0,"region":"Chrysochou","curPct":50.2,"curMCM":12.043,"lyPct":21.9,"lyMCM":5.268,"inflowOct":10.167},{"name":"Argaka","capacity":0.99,"region":"Chrysochou","curPct":98.2,"curMCM":0.972,"lyPct":31.7,"lyMCM":0.314,"inflowOct":1.035},{"name":"Pomos","capacity":0.86,"region":"Chrysochou","curPct":100.0,"curMCM":0.86,"lyPct":36.2,"lyMCM":0.311,"inflowOct":0.833},{"name":"Agia Marina","capacity":0.298,"region":"Chrysochou","curPct":95.0,"curMCM":0.283,"lyPct":44.3,"lyMCM":0.132,"inflowOct":0.282},{"name":"Vyzakia","capacity":1.69,"region":"Nicosia","curPct":97.6,"curMCM":1.649,"lyPct":1.9,"lyMCM":0.032,"inflowOct":1.72},{"name":"Xyliatos","capacity":1.43,"region":"Nicosia","curPct":99.4,"curMCM":1.421,"lyPct":18.2,"lyMCM":0.26,"inflowOct":1.467},{"name":"Kalopanagiotis","capacity":0.363,"region":"Nicosia","curPct":100.0,"curMCM":0.363,"lyPct":67.5,"lyMCM":0.245,"inflowOct":0.311},{"name":"Tamassos","capacity":2.8,"region":"Recharge/Other","curPct":100.0,"curMCM":2.8,"lyPct":32.4,"lyMCM":0.908,"inflowOct":2.649},{"name":"Klirou-Malounta","capacity":2.0,"region":"Recharge/Other","curPct":100.0,"curMCM":2.0,"lyPct":70.5,"lyMCM":1.41,"inflowOct":1.117},{"name":"Solea","capacity":4.454,"region":"Recharge/Other","curPct":99.6,"curMCM":4.436,"lyPct":60.5,"lyMCM":2.695,"inflowOct":2.636}],"systemNow":{"mcm":123.424,"pct":42.4},"systemLastYear":{"mcm":61.531,"pct":21.2}};
const TOURISM = {
  "source": "Cyprus tourist arrivals, CYSTAT monthly press releases (2024).",
  "note": "Sep-Dec are exact CYSTAT figures; the annual total (4,040,200) and Jan-Sep cumulative (3,268,090) are exact. Jan-Aug monthly splits are estimates constrained to those official totals and to the documented Jul/Aug peak & Jan trough, pending the authoritative pull via scripts/refresh-annual.mjs (Eurostat tour_occ_arm / CYSTAT-DB).",
  "year": 2024,
  "annual": 4040200,
  "months": [
    { "m": "Jan", "n": 1, "arrivals": 95000, "exact": false },
    { "m": "Feb", "n": 2, "arrivals": 100000, "exact": false },
    { "m": "Mar", "n": 3, "arrivals": 195000, "exact": false },
    { "m": "Apr", "n": 4, "arrivals": 334000, "exact": false },
    { "m": "May", "n": 5, "arrivals": 445000, "exact": false },
    { "m": "Jun", "n": 6, "arrivals": 490000, "exact": false },
    { "m": "Jul", "n": 7, "arrivals": 545000, "exact": false },
    { "m": "Aug", "n": 8, "arrivals": 554627, "exact": false },
    { "m": "Sep", "n": 9, "arrivals": 509463, "exact": true },
    { "m": "Oct", "n": 10, "arrivals": 459106, "exact": true },
    { "m": "Nov", "n": 11, "arrivals": 179941, "exact": true },
    { "m": "Dec", "n": 12, "arrivals": 133063, "exact": true }
  ]
};
/* ============================ curated restriction events ============================ */
const EVENTS = [
  { startY: 1989, endY: 1991, label: "1990–91 drought", scope: "household",
    note: "Severe drought; supply rationing imposed across the major towns." },
  { startY: 1996, endY: 2000, label: "1997–2000 drought", scope: "household",
    note: "Urban supply held below normal — Nicosia ~80%, Limassol ~86%, Larnaca ~70% of continuous flow." },
  { startY: 2007, endY: 2009, label: "2007–08 crisis", scope: "household",
    note: "Weekly cuts; supply ~8h per 48h. Water shipped from Greece by tanker Jul–Nov 2008 (~40–50k m³/day). Reserves bottomed near 13 MCM." },
  { startY: 2017, endY: 2018, label: "2018 drought", scope: "agriculture",
    note: "Lowest dams since 2008. Irrigation cut for farmers; urban taps maintained via desalination." },
  { startY: 2023, endY: 2025, label: "2024–25 drought", scope: "agriculture",
    note: "State of emergency Jan 2025 (~10% reserves). Farmers −30%, public asked −10%, UAE desalination units deployed." },
];

const DAMS = [
  { key: "totalAll", label: "Whole system", unit: "MCM", cap: null },
  { key: "kouris", label: "Kouris", unit: "%", cap: 115 },
  { key: "asprokremmos", label: "Asprokremmos", unit: "%", cap: 52.375 },
  { key: "evretou", label: "Evretou", unit: "%", cap: 24 },
  { key: "kannaviou", label: "Kannaviou", unit: "%", cap: 17.168 },
  { key: "germasoyeia", label: "Germasoyeia", unit: "%", cap: 13.5 },
];

/* ============================ helpers ============================ */
function waterYearInfo(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const startYear = m >= 10 ? y : y - 1;
  const start = Date.UTC(startYear, 9, 1);
  const cur = Date.UTC(y, m - 1, d);
  const doy = Math.round((cur - start) / 86400000);
  const label = `${String(startYear % 100).padStart(2, "0")}/${String((startYear + 1) % 100).padStart(2, "0")}`;
  return { startYear, doy, label };
}
// month tick positions on a water-year axis (Oct 1 = 0), non-leap reference
const MONTH_TICKS = (() => {
  const names = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const lens = [31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30];
  const out = []; let acc = 0;
  for (let i = 0; i < 12; i++) { out.push({ name: names[i], doy: acc }); acc += lens[i]; }
  return out;
})();

function levelColor(pct) {
  if (pct < 10) return "var(--c-crit)";
  if (pct < 25) return "var(--c-low)";
  if (pct < 50) return "var(--c-mod)";
  if (pct < 80) return "var(--c-good)";
  return "var(--c-full)";
}
function levelName(pct) {
  if (pct < 10) return "Critical";
  if (pct < 25) return "Low";
  if (pct < 50) return "Moderate";
  if (pct < 80) return "Good";
  return "Full";
}

/* ============================ tiny svg line chart primitives ============================ */
function useScales(w, h, pad, xmax, ymax) {
  const X = (v) => pad.l + (v / xmax) * (w - pad.l - pad.r);
  const Y = (v) => h - pad.b - (v / ymax) * (h - pad.t - pad.b);
  return { X, Y };
}
function path(points, X, Y) {
  return points
    .filter((p) => p.y != null)
    .map((p, i) => `${i === 0 ? "M" : "L"}${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`)
    .join(" ");
}

/* ============================ SEASONAL OVERLAY CHART ============================ */
const DROUGHT_YEARS = new Set(["07/08", "17/18", "24/25"]);
const CURRENT_YEAR = "25/26";
const NOTABLE_WET = ["03/04", "11/12", "18/19", "19/20", "21/22"];

function OverlayChart({ damKey, pinned, togglePin }) {
  const dam = DAMS.find((d) => d.key === damKey);
  const isPct = dam.unit === "%";
  const [hover, setHover] = useState(null);
  const w = 760, h = 420, pad = { l: 52, r: 18, t: 18, b: 34 };

  const series = useMemo(() => {
    const groups = {};
    for (const row of DATA.history) {
      const raw = row[damKey];
      if (raw == null) continue;
      const v = isPct ? (raw / dam.cap) * 100 : raw;
      const { label, doy } = waterYearInfo(row.date);
      (groups[label] ||= []).push({ x: doy, y: v, date: row.date });
    }
    return Object.entries(groups)
      .map(([label, pts]) => ({ label, pts: pts.sort((a, b) => a.x - b.x) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [damKey]);

  const ymax = isPct ? 105 : 300;
  const { X, Y } = useScales(w, h, pad, 365, ymax);

  // category of a year: pinned > current > drought > base
  const cat = (label) =>
    pinned.has(label) ? "pin" : label === CURRENT_YEAR ? "cur" : DROUGHT_YEARS.has(label) ? "dry" : "base";
  const styleFor = {
    base: { c: "var(--faint)", wBase: 1, wActive: 2.4, op: 0.5 },
    dry: { c: "var(--c-low)", wBase: 2.2, wActive: 3.4, op: 0.95 },
    cur: { c: "var(--c-water)", wBase: 3.6, wActive: 3.8, op: 1 },
    pin: { c: "var(--c-pin)", wBase: 3, wActive: 3.6, op: 1 },
  };
  // draw order
  const rank = { base: 0, dry: 1, cur: 2, pin: 3 };
  const ordered = [...series].sort((a, b) => rank[cat(a.label)] - rank[cat(b.label)]);

  const labelPeak = (s) => s.pts.reduce((a, b) => (b.y > a.y ? b : a), s.pts[0]);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        {/* 100% reference (pct view) */}
        {isPct && (
          <g>
            <line x1={pad.l} x2={w - pad.r} y1={Y(100)} y2={Y(100)} stroke="var(--c-full)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <text x={w - pad.r} y={Y(100) - 5} textAnchor="end" className="axlbl" style={{ fill: "var(--c-full)" }}>full / overflow</text>
          </g>
        )}
        {/* y gridlines */}
        {(isPct ? [0, 25, 50, 75, 100] : [0, 75, 150, 225, 300]).map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}{isPct ? "%" : ""}</text>
          </g>
        ))}
        {/* month ticks */}
        {MONTH_TICKS.map((m) => (
          <text key={m.name} x={X(m.doy + 15)} y={h - 12} textAnchor="middle" className="axlbl">{m.name}</text>
        ))}
        {/* lines */}
        {ordered.map((s) => {
          const c = cat(s.label); const st = styleFor[c];
          const active = hover === s.label;
          const dim = hover && hover !== s.label && c === "base";
          return (
            <path key={s.label} d={path(s.pts, X, Y)} fill="none"
              stroke={st.c} strokeWidth={active ? st.wActive : st.wBase}
              opacity={dim ? 0.18 : st.op}
              onMouseEnter={() => setHover(s.label)}
              onClick={() => togglePin(s.label)}
              style={{ cursor: "pointer" }} />
          );
        })}
        {/* peak labels for pinned + current */}
        {ordered.filter((s) => pinned.has(s.label) || s.label === CURRENT_YEAR).map((s) => {
          const p = labelPeak(s);
          const isPin = pinned.has(s.label);
          return (
            <g key={"lbl" + s.label}>
              <circle cx={X(p.x)} cy={Y(p.y)} r="3.5" fill={isPin ? "var(--c-pin)" : "var(--c-water)"} />
              <text x={X(p.x)} y={Y(p.y) - 8} textAnchor="middle" className="hovlbl"
                style={{ fill: isPin ? "var(--c-pin)" : "var(--c-water-deep)" }}>
                {s.label} · {p.y.toFixed(0)}{isPct ? "%" : ""}
              </text>
            </g>
          );
        })}
        {/* hover label (transient) */}
        {hover && !pinned.has(hover) && hover !== CURRENT_YEAR && (() => {
          const s = series.find((x) => x.label === hover);
          const p = labelPeak(s);
          return (
            <g>
              <circle cx={X(p.x)} cy={Y(p.y)} r="3.5" fill="var(--ink)" />
              <text x={X(p.x)} y={Y(p.y) - 8} textAnchor="middle" className="hovlbl">
                {hover} · peak {p.y.toFixed(0)}{isPct ? "%" : " MCM"}
              </text>
            </g>
          );
        })()}
      </svg>
      <p className="hint">Click any line to pin it · hover to preview</p>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-water)" }} />2025/26</span>
        <span><i style={{ background: "var(--c-low)" }} />Drought years</span>
        <span><i style={{ background: "var(--c-pin)" }} />Pinned</span>
        <span><i style={{ background: "var(--faint)" }} />Other years (1988→)</span>
      </div>
      {!isPct && (
        <p className="caveat">System total in absolute MCM. Capacity grew as dams were built (Kannaviou 2006, etc.), so early years sit structurally lower — switch to a single dam for a like-for-like % comparison. The system peaked at 288 MCM (99%) in May 2020.</p>
      )}
    </div>
  );
}

/* ============================ FULL TIMELINE CHART ============================ */
function TimelineChart({ damKey }) {
  const dam = DAMS.find((d) => d.key === damKey);
  const isPct = dam.unit === "%";
  const [hover, setHover] = useState(null);
  const w = 760, h = 380, pad = { l: 52, r: 18, t: 18, b: 28 };

  const pts = useMemo(() => {
    const arr = [];
    for (const row of DATA.history) {
      const raw = row[damKey];
      if (raw == null) continue;
      const [y, m, d] = row.date.split("-").map(Number);
      const t = y + (m - 1) / 12 + d / 365;
      arr.push({ x: t, y: isPct ? (raw / dam.cap) * 100 : raw, date: row.date });
    }
    return arr;
  }, [damKey]);

  const xmin = 1988, xmax = 2026.5;
  const ymax = isPct ? 100 : 300;
  const X = (v) => pad.l + ((v - xmin) / (xmax - xmin)) * (w - pad.l - pad.r);
  const Y = (v) => h - pad.b - (v / ymax) * (h - pad.t - pad.b);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * w;
          const xv = xmin + ((px - pad.l) / (w - pad.l - pad.r)) * (xmax - xmin);
          let best = null, bd = 1e9;
          for (const p of pts) { const dd = Math.abs(p.x - xv); if (dd < bd) { bd = dd; best = p; } }
          if (best && bd < 0.6) setHover(best); else setHover(null);
        }}
        onMouseLeave={() => setHover(null)}>
        {/* restriction bands */}
        {EVENTS.map((ev) => {
          const x1 = X(Math.max(ev.startY, xmin)), x2 = X(ev.endY + 0.75);
          return (
            <g key={ev.label}>
              <rect x={x1} y={pad.t} width={Math.max(2, x2 - x1)} height={h - pad.t - pad.b}
                fill={ev.scope === "household" ? "var(--band-hh)" : "var(--band-ag)"} />
              <text x={(x1 + x2) / 2} y={pad.t + 12} textAnchor="middle" className="bandlbl">{ev.label}</text>
            </g>
          );
        })}
        {/* y grid */}
        {(isPct ? [0, 25, 50, 75, 100] : [0, 75, 150, 225, 300]).map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}{isPct ? "%" : ""}</text>
          </g>
        ))}
        {/* x ticks */}
        {[1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025].map((yr) => (
          <text key={yr} x={X(yr)} y={h - 10} textAnchor="middle" className="axlbl">{yr}</text>
        ))}
        {/* line */}
        <path d={path(pts, X, Y)} fill="none" stroke="var(--c-water-deep)" strokeWidth="1.8" />
        {/* hover */}
        {hover && (
          <g>
            <line x1={X(hover.x)} x2={X(hover.x)} y1={pad.t} y2={h - pad.b} stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx={X(hover.x)} cy={Y(hover.y)} r="4" fill="var(--c-water-deep)" />
            <text x={X(hover.x) > w / 2 ? X(hover.x) - 8 : X(hover.x) + 8} y={Y(hover.y) - 8}
              textAnchor={X(hover.x) > w / 2 ? "end" : "start"} className="hovlbl">
              {hover.date} · {hover.y.toFixed(isPct ? 0 : 0)}{isPct ? "%" : " MCM"}
            </text>
          </g>
        )}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--band-hh)" }} />Household cuts</span>
        <span><i style={{ background: "var(--band-ag)" }} />Agricultural restrictions</span>
        <span><i style={{ background: "var(--c-water-deep)" }} />Storage</span>
      </div>
    </div>
  );
}

/* ============================ INFLOW CHART ============================ */
function InflowChart() {
  const order = ["October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "Aug-Sep"];
  const w = 760, h = 360, pad = { l: 48, r: 18, t: 16, b: 30 };
  const highlight = { "25/26": "var(--c-water)", "24/25": "var(--c-low)", "18/19": "var(--c-good)" };

  const series = DATA.inflow.map((yr) => {
    let acc = 0; const pts = [];
    order.forEach((m, i) => { acc += yr.months[m] || 0; pts.push({ x: i, y: acc }); });
    return { year: yr.year, pts, total: yr.total };
  });
  const ymax = Math.max(...series.map((s) => s.total)) * 1.05;
  const { X, Y } = useScales(w, h, pad, order.length - 1, ymax);
  const [hover, setHover] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        {[0, 50, 100, 150, 200, 250].filter((g) => g <= ymax).map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}</text>
          </g>
        ))}
        {order.map((m, i) => (
          <text key={m} x={X(i)} y={h - 10} textAnchor="middle" className="axlbl">{m.slice(0, 3)}</text>
        ))}
        {series.filter((s) => !highlight[s.year]).map((s) => (
          <path key={s.year} d={path(s.pts, X, Y)} fill="none" stroke="var(--faint)"
            strokeWidth={hover === s.year ? 2.4 : 1} opacity={hover && hover !== s.year ? 0.25 : 0.5}
            onMouseEnter={() => setHover(s.year)} style={{ cursor: "pointer" }} />
        ))}
        {series.filter((s) => highlight[s.year]).map((s) => (
          <path key={s.year} d={path(s.pts, X, Y)} fill="none" stroke={highlight[s.year]}
            strokeWidth="3" opacity={hover && hover !== s.year ? 0.4 : 1}
            onMouseEnter={() => setHover(s.year)} style={{ cursor: "pointer" }} />
        ))}
        {hover && (() => {
          const s = series.find((x) => x.year === hover); const last = s.pts[s.pts.length - 1];
          return (<text x={X(last.x) - 6} y={Y(last.y) - 6} textAnchor="end" className="hovlbl">{hover} · {s.total.toFixed(0)} MCM</text>);
        })()}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-water)" }} />25/26 · 112 MCM (best since 1987)</span>
        <span><i style={{ background: "var(--c-low)" }} />24/25 · 19 MCM (drought)</span>
        <span><i style={{ background: "var(--c-good)" }} />18/19 · 265 MCM (record wet)</span>
      </div>
    </div>
  );
}

/* ============================ TOURISM x STORAGE OVERLAY ============================ */
function TourismOverlay() {
  const [hover, setHover] = useState(null);
  const w = 760, h = 400, pad = { l: 46, r: 54, t: 20, b: 36 };
  const order = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // water year Oct→Sep

  // storage climatology: mean system %-full by calendar month across all years
  const byMonth = {};
  for (const row of DATA.history) {
    if (row.totalAll == null) continue;
    const m = +row.date.slice(5, 7);
    (byMonth[m] ||= []).push((row.totalAll / DATA.totalCapacity) * 100);
  }
  const stor = order.map((m) => {
    const a = byMonth[m] || [];
    return a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
  });

  const tmap = {};
  TOURISM.months.forEach((o) => (tmap[o.n] = o));
  const tour = order.map((m) => tmap[m]);
  const maxArr = Math.max(...TOURISM.months.map((o) => o.arrivals));

  const X = (i) => pad.l + (i / (order.length - 1)) * (w - pad.l - pad.r);
  const Ys = (v) => h - pad.b - (v / 100) * (h - pad.t - pad.b);
  const Yt = (v) => h - pad.b - (v / (maxArr * 1.12)) * (h - pad.t - pad.b);
  const barW = ((w - pad.l - pad.r) / order.length) * 0.62;

  const peakIdx = order.indexOf(TOURISM.months.reduce((a, b) => (b.arrivals > a.arrivals ? b : a)).n);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        <defs>
          <pattern id="hatch" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="var(--c-mod)" opacity="0.28" />
            <line x1="0" y1="0" x2="0" y2="5" stroke="var(--c-mod)" strokeWidth="2" opacity="0.6" />
          </pattern>
        </defs>
        <rect x={X(peakIdx) - barW} y={pad.t} width={barW * 2} height={h - pad.t - pad.b} fill="var(--c-low)" opacity="0.06" />
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Ys(g)} y2={Ys(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 7} y={Ys(g) + 3} textAnchor="end" className="axlbl">{g}%</text>
          </g>
        ))}
        {[0, 200000, 400000, 600000].map((g) => (
          <text key={g} x={w - pad.r + 7} y={Yt(g) + 3} textAnchor="start" className="axlbl" style={{ fill: "var(--c-mod)" }}>
            {g / 1000}k
          </text>
        ))}
        {tour.map((o, i) => o && (
          <rect key={o.m} x={X(i) - barW / 2} y={Yt(o.arrivals)} width={barW} height={Ys(0) - Yt(o.arrivals)}
            fill={o.exact ? "var(--c-mod)" : "url(#hatch)"} stroke="var(--c-mod)" strokeWidth={o.exact ? 0 : 0.8}
            opacity={hover == null || hover === i ? 0.92 : 0.4}
            onMouseEnter={() => setHover(i)} style={{ cursor: "pointer" }} />
        ))}
        <path d={stor.map((v, i) => `${i === 0 ? "M" : "L"}${X(i).toFixed(1)},${Ys(v).toFixed(1)}`).join(" ")}
          fill="none" stroke="var(--c-water-deep)" strokeWidth="3" />
        {stor.map((v, i) => <circle key={i} cx={X(i)} cy={Ys(v)} r="2.5" fill="var(--c-water-deep)" />)}
        {tour.map((o, i) => (
          <text key={o.m} x={X(i)} y={h - 12} textAnchor="middle" className="axlbl"
            style={{ fontWeight: i === peakIdx ? 700 : 400 }}>{o.m}</text>
        ))}
        {hover != null && tour[hover] && (
          <g>
            <text x={X(hover)} y={Yt(tour[hover].arrivals) - 8} textAnchor="middle" className="hovlbl" style={{ fill: "#8a6418" }}>
              {(tour[hover].arrivals / 1000).toFixed(0)}k{tour[hover].exact ? "" : "*"}
            </text>
            <text x={X(hover)} y={Ys(stor[hover]) - 8} textAnchor="middle" className="hovlbl" style={{ fill: "var(--c-water-deep)" }}>
              {stor[hover].toFixed(0)}%
            </text>
          </g>
        )}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-water-deep)" }} />Reservoir fill — 38-yr monthly average (left)</span>
        <span><i style={{ background: "var(--c-mod)" }} />Tourist arrivals 2024 (right)</span>
        <span><i style={{ background: "var(--c-low)", opacity: 0.5 }} />Peak month</span>
      </div>
      <p className="caveat">
        The collision is the point: arrivals crest in <strong>Jul–Aug</strong> just as reservoirs slide toward their late-summer low.
        Sep–Dec arrivals are exact CYSTAT figures; months marked <em>*</em> (hatched) are estimates constrained to the official
        2024 annual total and Jan–Sep cumulative — run <code>npm run refresh:annual</code> to swap in the authoritative Eurostat series.
      </p>
    </div>
  );
}

/* ============================ DAM TABLE ============================ */
function DamTable() {
  const [sort, setSort] = useState({ k: "capacity", dir: -1 });
  const capTotal = DATA.reservoirs.reduce((a, r) => a + r.capacity, 0);
  const rows = [...DATA.reservoirs].sort((a, b) => {
    const av = a[sort.k], bv = b[sort.k];
    if (typeof av === "string") return av.localeCompare(bv) * sort.dir;
    return (av - bv) * sort.dir;
  });
  const head = (k, lbl, align) => (
    <th onClick={() => setSort((s) => ({ k, dir: s.k === k ? -s.dir : (typeof DATA.reservoirs[0][k] === "string" ? 1 : -1) }))}
      style={{ textAlign: align || "left", cursor: "pointer" }}>
      {lbl}{sort.k === k ? (sort.dir === 1 ? " ▲" : " ▼") : ""}
    </th>
  );
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            {head("name", "Reservoir")}
            {head("capacity", "Capacity (MCM)", "right")}
            <th style={{ textAlign: "right" }}>% of national</th>
            {head("curPct", "Now", "right")}
            <th style={{ width: "20%" }}>Level</th>
            {head("curMCM", "MCM", "right")}
            <th style={{ textAlign: "right" }}>vs last yr</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const diff = (r.curPct - r.lyPct);
            const share = (r.capacity / capTotal) * 100;
            return (
              <tr key={r.name}>
                <td className="nm">{r.name}</td>
                <td className="num">{r.capacity.toFixed(1)}</td>
                <td className="num" style={{ fontWeight: 600 }}>{share.toFixed(1)}%</td>
                <td className="num" style={{ color: levelColor(r.curPct), fontWeight: 600 }}>{r.curPct.toFixed(1)}%</td>
                <td>
                  <div className="bar"><div className="fill" style={{ width: `${Math.min(100, r.curPct)}%`, background: levelColor(r.curPct) }} /></div>
                </td>
                <td className="num">{r.curMCM.toFixed(2)}</td>
                <td className="num" style={{ color: diff >= 0 ? "var(--c-water)" : "var(--c-low)" }}>
                  {diff >= 0 ? "+" : ""}{diff.toFixed(1)}pp
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ============================ APP ============================ */
/* ============================ YEARLY TREND (CLIMATE) ============================ */
function YearlyTrend() {
  const [hover, setHover] = useState(null);
  const w = 760, h = 360, pad = { l: 40, r: 16, t: 18, b: 30 };
  const KCAP = 115; // Kouris capacity — fixed, full 1988 record → clean climate yardstick

  const by = {};
  for (const r of DATA.history) {
    if (r.kouris == null) continue;
    const [y, m] = r.date.split("-").map(Number);
    const wy = m >= 10 ? y : y - 1;
    (by[wy] ||= []).push((r.kouris / KCAP) * 100);
  }
  const years = Object.keys(by).map(Number).sort((a, b) => a - b);
  const series = years.map((y) => ({ y, v: by[y].reduce((a, b) => a + b, 0) / by[y].length }));
  const ma = series.map((s, i) => {
    const win = series.slice(Math.max(0, i - 2), i + 3);
    return { y: s.y, v: win.reduce((a, b) => a + b.v, 0) / win.length };
  });

  const xmin = years[0], xmax = years[years.length - 1];
  const X = (v) => pad.l + ((v - xmin) / (xmax - xmin)) * (w - pad.l - pad.r);
  const Y = (v) => h - pad.b - (v / 100) * (h - pad.t - pad.b);
  const barW = ((w - pad.l - pad.r) / series.length) * 0.7;

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}>
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(g)} y2={Y(g)} stroke="var(--grid)" strokeWidth="1" />
            <text x={pad.l - 7} y={Y(g) + 3} textAnchor="end" className="axlbl">{g}%</text>
          </g>
        ))}
        {series.map((s) => (
          <rect key={s.y} x={X(s.y) - barW / 2} y={Y(s.v)} width={barW} height={Y(0) - Y(s.v)}
            fill={levelColor(s.v)} opacity={hover == null || hover === s.y ? 0.9 : 0.35}
            onMouseEnter={() => setHover(s.y)} style={{ cursor: "pointer" }} />
        ))}
        <path d={ma.map((p, i) => `${i === 0 ? "M" : "L"}${X(p.y).toFixed(1)},${Y(p.v).toFixed(1)}`).join(" ")}
          fill="none" stroke="var(--ink)" strokeWidth="2" opacity="0.8" />
        {[1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025].map((yr) => (
          <text key={yr} x={X(yr)} y={h - 10} textAnchor="middle" className="axlbl">{yr}</text>
        ))}
        {hover != null && (() => {
          const s = series.find((x) => x.y === hover);
          return (
            <text x={X(hover)} y={Y(s.v) - 7} textAnchor="middle" className="hovlbl">
              {hover}/{String((hover + 1) % 100).padStart(2, "0")} · {s.v.toFixed(0)}%
            </text>
          );
        })()}
      </svg>
      <div className="legendrow">
        <span><i style={{ background: "var(--c-low)" }} />Kouris annual mean (colour = level)</span>
        <span><i style={{ background: "var(--ink)" }} />5-year moving average</span>
      </div>
      <p className="caveat">
        Decadal means: 1980s 42% · 1990s 24% · 2000s 39% · 2010s 48% · 2020s 48%. The long-run linear trend is
        essentially flat (+0.5pp/yr), so the climate signal here is amplitude, not a steady fall — droughts that bite
        deeper and recoveries that swing higher. Kouris is shown because its capacity is fixed; the system total is
        muddied by dams added over time.
      </p>
    </div>
  );
}

/* ============================ COST LADDER (price per m³ by source) ============================ */
function CostLadder() {
  const rows = [
    { label: "Subsidised irrigation tariff", val: 0.25, rng: "€0.15–0.34", c: "var(--c-good)" },
    { label: "Household drinking-water tariff", val: 0.75, rng: "€0.50–1.00", c: "var(--c-good)" },
    { label: "Desalination — coastal plant", val: 1.25, rng: "€1.00–1.50", c: "var(--c-mod)" },
    { label: "Desalination — mobile unit", val: 2.0, rng: "≈ €2.00", c: "var(--c-low)" },
    { label: "Desalination — floating unit", val: 6.0, rng: "up to €6.00", c: "var(--c-crit)" },
  ];
  const w = 760, barH = 30, gap = 16, padT = 10, x0 = 232, max = 6.5;
  const h = padT * 2 + rows.length * barH + (rows.length - 1) * gap;
  const X = (v) => x0 + (v / max) * (w - x0 - 64);
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {rows.map((r, i) => {
          const y = padT + i * (barH + gap);
          return (
            <g key={r.label}>
              <text x={x0 - 10} y={y + barH / 2 + 4} textAnchor="end" className="ladderlbl">{r.label}</text>
              <rect x={x0} y={y} width={Math.max(2, X(r.val) - x0)} height={barH} rx="2" fill={r.c} opacity="0.9" />
              <text x={X(r.val) + 7} y={y + barH / 2 + 4} className="hovlbl" style={{ fill: "var(--ink)" }}>{r.rng}</text>
            </g>
          );
        })}
      </svg>
      <p className="caveat">
        Cost per cubic metre climbs roughly 25× from stored rainwater to emergency floating desalination. Desal figures
        are production cost; the tariffs are what users are charged — heavily subsidised, so the state absorbs the gap.
      </p>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("overlay"); // overlay | timeline
  const [damKey, setDamKey] = useState("kouris");
  const [pinned, setPinned] = useState(new Set());
  const togglePin = (yr) => setPinned((p) => {
    const n = new Set(p); n.has(yr) ? n.delete(yr) : n.add(yr); return n;
  });
  const clearPins = () => setPinned(new Set());
  const s = DATA;
  const total = s.systemNow.mcm;
  const pct = s.systemNow.pct;
  const lyPct = s.systemLastYear.pct;

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800;9..144,900&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .root{
          --bg:#f6f0e3; --paper:#fbf6ec; --ink:#241d17; --muted:#5a4d3c;
          --grid:#e3d6bf; --faint:#bcae97;
          --c-crit:#7a2410; --c-low:#c0492b; --c-mod:#c9912f; --c-good:#3f93a0; --c-full:#0f4a52;
          --c-water:#1f7d88; --c-water-deep:#0f4a52; --c-pin:#b5326b;
          --band-hh:rgba(192,73,43,0.16); --band-ag:rgba(201,145,47,0.16);
          background:var(--bg); color:var(--ink);
          font-family:'Newsreader',Georgia,serif; line-height:1.6;
          padding:0; min-height:100%;
          background-image:radial-gradient(circle at 12% -5%, rgba(63,147,160,.06), transparent 40%),
                           radial-gradient(circle at 95% 8%, rgba(192,73,43,.05), transparent 38%);
        }
        .wrap{max-width:880px;margin:0 auto;padding:46px 28px 80px;}
        .kicker{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--c-low);margin:0 0 14px;}
        h1{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(38px,7vw,64px);line-height:1.02;letter-spacing:-.02em;margin:0 0 18px;}
        h1 em{font-style:italic;color:var(--c-water-deep);}
        .byline{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;color:var(--faint);margin:-12px 0 24px;}
        .byline a{color:inherit;text-decoration:none;}
        .byline a:hover{color:var(--c-water-deep);text-decoration:underline;}
        .lede{font-size:19px;color:var(--muted);max-width:640px;margin:0 0 34px;}
        .stats{display:flex;flex-wrap:wrap;gap:26px;padding:22px 0;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink);margin-bottom:46px;}
        .stat .v{font-family:'Fraunces',serif;font-weight:800;font-size:40px;line-height:1;}
        .stat .l{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:6px;}
        .units-glossary{flex-basis:100%;font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.55;color:var(--muted);
          border-left:2px solid var(--faint);padding:0 0 0 12px;margin:10px 0 0;}
        h2{font-family:'Fraunces',serif;font-weight:700;font-size:27px;letter-spacing:-.01em;margin:54px 0 6px;}
        .sub{color:var(--muted);font-size:15.5px;margin:0 0 20px;max-width:660px;}
        p.body{font-size:17px;max-width:660px;}
        .card{background:var(--paper);border:1px solid var(--grid);border-radius:4px;padding:22px 20px 16px;box-shadow:0 1px 0 rgba(0,0,0,.04);}
        .toggles{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
        .seg{display:inline-flex;border:1.4px solid var(--ink);border-radius:2px;overflow:hidden;}
        .seg button{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;
          border:none;background:transparent;color:var(--ink);padding:7px 13px;cursor:pointer;}
        .seg button.on{background:var(--ink);color:var(--paper);}
        .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
        .chip{display:flex;flex-direction:column;gap:5px;min-width:96px;border:1px solid var(--faint);background:transparent;color:var(--muted);
          padding:8px 11px;border-radius:5px;cursor:pointer;text-align:left;}
        .chip.on{border-color:var(--c-water-deep);background:var(--c-water-deep);color:var(--paper);}
        .chip .chiptop{font-family:'Newsreader',serif;font-size:14px;font-weight:600;color:inherit;}
        .chip .chipcap{display:flex;align-items:center;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.02em;}
        .chip .chipcap i{display:block;height:4px;border-radius:2px;background:var(--faint);min-width:3px;}
        .chip.on .chipcap i{background:var(--paper);}
        .pinrow{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:14px;}
        .pinlbl{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);}
        .pinchip{font-family:'IBM Plex Mono',monospace;font-size:11px;border:1px solid var(--faint);background:transparent;color:var(--muted);
          padding:4px 9px;border-radius:13px;cursor:pointer;}
        .pinchip.on{border-color:var(--c-pin);background:var(--c-pin);color:var(--paper);}
        .pinclear{font-family:'IBM Plex Mono',monospace;font-size:10.5px;border:none;background:transparent;color:var(--c-pin);cursor:pointer;text-decoration:underline;}
        .hint{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:var(--muted);margin:8px 0 0;text-align:right;}
        .caprow{display:flex;align-items:center;gap:8px;}
        .capbar{flex:0 0 56px;height:7px;background:var(--grid);border-radius:4px;overflow:hidden;}
        .capfill{height:100%;background:var(--c-water-deep);border-radius:4px;}
        .capnum{font-family:'IBM Plex Mono',monospace;font-size:12px;white-space:nowrap;}
        .capnum em{font-style:normal;color:var(--muted);font-size:10.5px;margin-left:2px;}
        .axlbl{font-family:'IBM Plex Mono',monospace;font-size:10px;fill:var(--muted);}
        .bandlbl{font-family:'IBM Plex Mono',monospace;font-size:9px;fill:var(--muted);letter-spacing:.04em;}
        .hovlbl{font-family:'IBM Plex Mono',monospace;font-size:12px;fill:var(--ink);font-weight:600;}
        .legendrow{display:flex;gap:18px;flex-wrap:wrap;margin-top:12px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);}
        .legendrow i{display:inline-block;width:14px;height:3px;border-radius:2px;margin-right:6px;vertical-align:middle;}
        .caveat{font-size:13px;color:var(--muted);font-style:italic;margin:12px 0 0;}
        .caveat code{font-style:normal;font-family:'IBM Plex Mono',monospace;font-size:11.5px;background:var(--grid);padding:1px 5px;border-radius:3px;}
        .draw{stroke-dasharray:2400;stroke-dashoffset:2400;animation:dr 1.6s .2s ease forwards;}
        @keyframes dr{to{stroke-dashoffset:0;}}
        .tablewrap{overflow-x:auto;border:1px solid var(--grid);border-radius:4px;background:var(--paper);}
        table{width:100%;border-collapse:collapse;font-size:14px;}
        th{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
          padding:12px 12px;border-bottom:1.5px solid var(--ink);white-space:nowrap;}
        td{padding:9px 12px;border-bottom:1px solid var(--grid);}
        td.nm{font-weight:600;}
        td.reg{color:var(--muted);font-size:13px;}
        td.num{font-family:'IBM Plex Mono',monospace;text-align:right;font-size:13px;}
        .bar{height:9px;background:var(--grid);border-radius:5px;overflow:hidden;}
        .bar .fill{height:100%;border-radius:5px;}
        .timeline{display:flex;flex-direction:column;gap:0;margin-top:8px;}
        .ev{display:grid;grid-template-columns:108px 1fr;gap:16px;padding:16px 0;border-top:1px solid var(--grid);}
        .ev .yr{font-family:'Fraunces',serif;font-weight:700;font-size:18px;}
        .ev .sc{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
          display:inline-block;padding:3px 7px;border-radius:10px;margin-top:6px;}
        .ev .sc.household{background:var(--band-hh);color:var(--c-crit);}
        .ev .sc.agriculture{background:var(--band-ag);color:#8a6418;}
        .ev .nt{font-size:15px;color:var(--ink);}
        .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;}
        .ladderlbl{font-family:'IBM Plex Mono',monospace;font-size:11px;fill:var(--ink);}
        .costcard{margin-top:18px;background:var(--c-water-deep);color:var(--paper);border-radius:6px;padding:24px 24px;}
        .costbig{font-family:'Fraunces',serif;font-weight:900;font-size:46px;line-height:1;}
        .costbig span{font-family:'IBM Plex Mono',monospace;font-size:15px;font-weight:400;opacity:0.7;margin-left:8px;}
        .costlabel{font-size:17px;margin-top:8px;max-width:560px;opacity:0.95;}
        .costwork{font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.2);opacity:0.85;}
        .costcaveat{font-size:12px;font-style:italic;margin-top:10px;opacity:0.7;}        .tile{background:var(--paper);border:1px solid var(--grid);border-left:3px solid var(--c-mod);border-radius:4px;padding:14px 14px;}
        .tile .tv{font-family:'Fraunces',serif;font-weight:800;font-size:26px;line-height:1;color:var(--c-low);}
        .tile .tl{font-size:13px;color:var(--muted);margin-top:8px;line-height:1.45;}
        .foot{margin-top:60px;padding-top:22px;border-top:1.5px solid var(--ink);font-size:13px;color:var(--muted);}
        .foot a{color:var(--c-water-deep);}
        .foot-byline{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.04em;color:var(--faint);margin-top:18px;}
        .foot-byline a{color:inherit;text-decoration:none;}
        .foot-byline a:hover{color:var(--c-water-deep);text-decoration:underline;}
        .reveal{opacity:0;transform:translateY(14px);animation:rv .7s ease forwards;}
        @keyframes rv{to{opacity:1;transform:none;}}
      `}</style>

      <div className="wrap">
        <p className="kicker reveal">Cyprus · Water Development Department · snapshot {s.snapshotDate}</p>
        <h1 className="reveal" style={{ animationDelay: ".05s" }}>The price of low rainfall and <em>empty dams</em>.</h1>
        <p className="byline reveal" style={{ animationDelay: ".08s" }}>
          By{" "}
          <a href="https://medium.com/@thomascgeorgiou" target="_blank" rel="noreferrer">Thomas Georgiou</a>
          {" · "}
          <a href="https://medium.com/@thomascgeorgiou" target="_blank" rel="noreferrer">Medium</a>
          {" · "}
          <a href="https://www.linkedin.com/in/thomascgeorgiou/" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
        <p className="lede reveal" style={{ animationDelay: ".12s" }}>
          Cyprus relies heavily on its dams to provide water across the island, yet during dry periods it turns to the
          sea, where water costs up to 25 times more than rainfall use. 2026 spring's rebound is a stroke of luck inside
          a very dry decade. This analysis explores how the island fills its reservoirs and drains them each summer, how
          violently the swings have grown, and what it now costs to keep the taps running when the rain doesn't come.
        </p>

        <p className="kicker reveal" style={{ animationDelay: ".16s", marginBottom: 10 }}>Current state · June 2026</p>
        <div id="shot-stats" className="stats reveal" style={{ animationDelay: ".18s" }}>
          <div className="stat"><div className="v">{pct.toFixed(0)}%</div><div className="l">System full · {total.toFixed(0)} MCM</div></div>
          <div className="stat"><div className="v" style={{ color: "var(--c-water)" }}>+{(pct - lyPct).toFixed(0)}pp</div><div className="l">vs a year ago ({lyPct.toFixed(0)}%)</div></div>
          <div className="stat"><div className="v">112</div><div className="l">MCM inflow 25/26 · best since 1987</div></div>
          <div className="stat"><div className="v">{s.totalCapacity.toFixed(0)}</div><div className="l">MCM total capacity · 21 major dams (of ~108)</div></div>
          <p className="units-glossary">
            MCM = million cubic metres (one MCM ≈ 400 Olympic pools) · pp = percentage points (the gap between two
            percentages — here, this year's fill versus last year's).
          </p>
        </div>

        <h2>How the dams fill across a year</h2>
        <p className="sub">
          Every line is one water year (Oct → Sep). The shape tells the story: storage climbs with winter rain,
          peaks around April–May, then bleeds away over summer. Hover any line. Switch to the full timeline to see
          four decades at once, with restriction periods shaded.
        </p>
        <div id="shot-overlay" className="card">
          <div className="toggles">
            <div className="seg">
              <button className={mode === "overlay" ? "on" : ""} onClick={() => setMode("overlay")}>Overlay by season</button>
              <button className={mode === "timeline" ? "on" : ""} onClick={() => setMode("timeline")}>Full timeline 1988→</button>
            </div>
          </div>
          <div className="chips">
            {DAMS.map((d) => (
              <button key={d.key} className={"chip" + (damKey === d.key ? " on" : "")} onClick={() => setDamKey(d.key)}
                title={d.cap ? `${d.cap} MCM capacity` : "all reservoirs combined"}>
                <span className="chiptop">{d.label}</span>
                {d.cap
                  ? <span className="chipcap"><i style={{ width: `${(d.cap / 115) * 100}%` }} />{d.cap} MCM</span>
                  : <span className="chipcap full"><i style={{ width: "100%" }} />290 MCM</span>}
              </button>
            ))}
          </div>
          {mode === "overlay" && (
            <div className="pinrow">
              <span className="pinlbl">Pin a year:</span>
              {NOTABLE_WET.map((y) => (
                <button key={y} className={"pinchip wet" + (pinned.has(y) ? " on" : "")} onClick={() => togglePin(y)}>{y}</button>
              ))}
              {pinned.size > 0 && <button className="pinclear" onClick={clearPins}>clear ✕</button>}
            </div>
          )}
          {mode === "overlay"
            ? <OverlayChart damKey={damKey} pinned={pinned} togglePin={togglePin} />
            : <TimelineChart damKey={damKey} />}
          {mode === "overlay" && (
            <p className="caveat">Wet years where most big dams topped out and overflowed: 03/04, 11/12, 18/19, 19/20, 21/22. Kouris itself hit 100% in 2004, 2012 and 2020.</p>
          )}
        </div>

        <h2>When does the water actually arrive?</h2>
        <p className="sub">
          Cumulative inflow into the dams, month by month across the water year. A wet year front-loads in
          December–January; this year almost nothing came until February, then March–May did all the work.
        </p>
        <div id="shot-inflow" className="card"><InflowChart /></div>

        <h2>Year by year: drought and deluge</h2>
        <p className="sub">
          Each bar is one water year's average level at Kouris, the island's biggest reservoir and — with a fixed
          115-MCM capacity and a full 1988 record — the fairest yardstick for a climate signal. The striking feature
          isn't a steady decline but the whiplash: collapse years (1990, 1997, 2008, 2024) slamming against
          near-overflow ones (2003, 2012, 2019).
        </p>
        <div id="shot-yearly" className="card"><YearlyTrend /></div>

        <h2>Every reservoir, right now</h2>
        <p className="sub">
          All 21 active dams at the {s.snapshotDate} reading, sorted by capacity. Tap a header to re-sort.
          Storage is wildly uneven: <strong>Kouris alone holds 38% of national capacity, the two biggest dams 56%, the top six 80%</strong> — so a dry Kouris matters far more than a dozen full village dams.
        </p>
        <div id="shot-table"><DamTable /></div>

        <h2>When low water meant restrictions</h2>
        <p className="sub">
          Low dams don't automatically mean dry taps. Since desalination came online after 2008, household cuts
          have largely stopped — recent "restrictions" hit <strong>farmers</strong>, not kitchens. The distinction matters.
        </p>
        <div className="timeline">
          {EVENTS.slice().reverse().map((ev) => (
            <div className="ev" key={ev.label}>
              <div>
                <div className="yr">{ev.label}</div>
                <span className={"sc " + ev.scope}>{ev.scope === "household" ? "Household" : "Agriculture"}</span>
              </div>
              <div className="nt">{ev.note}</div>
            </div>
          ))}
        </div>

        <h2>The cost in the fields</h2>
        <p className="sub">
          When the dams run low it's farms, not taps, that absorb the shock — and the bill lands on crops, exports and
          prices. The dry winter of 2023–24 was formally declared a natural disaster; the deeper 2024–25 drought that
          followed drained reserves to a record low and forced the January 2025 state of emergency.
        </p>
        <div className="tiles">
          <div className="tile"><div className="tv">−30%</div><div className="tl">Irrigation allocation cut to farmers under the 2024–25 emergency; some Paphos schemes nearly halved (~17 → 8.5 MCM).</div></div>
          <div className="tile"><div className="tv">€10.2M</div><div className="tl">National drought compensation paid to 2,516 growers for 2024 losses (citrus, vegetables, potatoes, avocados) — about €4,000 per grower.</div></div>
          <div className="tile"><div className="tv">+€3.5M</div><div className="tl">EU agricultural-reserve emergency aid to Cyprus (Sept 2025), part of €98.6M shared across five member states.</div></div>
        </div>
        <p className="body" style={{ marginTop: 18 }}>
          So far the damage is uneven, as Halloumi kept setting export records straight through the drought — which is
          surprising given its PDO status needs ≥50% locally grown feed, something scarce water makes harder to supply.
          Other field crops took the hit and consumers felt it: at the peak of the 2024 squeeze tomatoes were retailing
          near €4/kg, watermelon climbed past €1/kg and cherry tomatoes were up roughly 140% year-on-year, as heat and
          scarcer, costlier water thinned harvests and nudged the island toward imported food. But farms and locals are
          only part of the demand on Cyprus's water — the other major party shows up every summer, on a plane.
        </p>

        <h2>The summer squeeze: demand peaks when supply bottoms out</h2>
        <p className="sub">
          Cyprus draws nearly three million visitors a year — about three times its own population — and they arrive in
          a tight summer window, just as the reservoirs slide from their spring peak toward the annual low. Tourism is
          worth 13.5% of GDP, and in peak season parts of the island use up to 500 litres of water per person per day,
          against a European average near 120.
        </p>
        <div id="shot-tourism" className="card"><TourismOverlay /></div>
        <p className="body" style={{ marginTop: 18 }}>
          With the dams already low, Cyprus can't simply pump harder to cover that spike. The permanent desalination
          plants are run flat out year-round — government policy now is to produce <em>"rain or no rain"</em> — so the
          summer surge is met at the margin by emergency capacity: the UAE shipped in mobile units as the 2025 season
          peaked, and the state is subsidising hotels to build their own. Which means the cost of the busy season lands
          on the most expensive water Cyprus has.
        </p>

        <h2>What it costs to stay dry</h2>
        <p className="sub">
          The reassuring half of the story is that your tap won't be cut, as it mostly runs on desalination — which is
          also the most expensive water on the island. Given how expensive it is, a startling share of it never reaches
          a tap.
        </p>
        <div className="tiles">
          <div className="tile"><div className="tv">€142–147M</div><div className="tl">Budgeted for desalinated water in 2026 alone — over 1% of all government spending (≈ €13.4bn), about €150 per resident or ~€400 per household a year, for a resource that falls free in winter.</div></div>
          <div className="tile"><div className="tv">€1.00–1.50</div><div className="tl">Cost to produce one cubic metre at a coastal plant. Dam water (stored rain) is a small fraction of that.</div></div>
          <div className="tile"><div className="tv">29%</div><div className="tl">Water lost in distribution nationwide — up to 40% in Nicosia's ageing pipes (2025 Audit Office report).</div></div>
          <div className="tile"><div className="tv">€460M</div><div className="tl">Total spent on desalinated water over the six years to 2022, as reliance on it has climbed to around 70% of the drinking-water supply.</div></div>
        </div>
        <div id="shot-costladder" className="card" style={{ marginTop: 18 }}><CostLadder /></div>
        <div className="costcard">
          <div className="costbig">≈ €20–30M<span>/ year</span></div>
          <div className="costlabel">the value of desalinated water that leaks out of the network before it ever reaches a tap — equivalent to roughly 14–21% of the entire desalination budget</div>
          <div className="costwork">
            29% distribution losses × ~70 MCM of desalinated domestic supply (2024) × €1.00–1.50/m³ to produce
            ≈ 20 MCM lost. On a full delivered-cost basis — the ~€145M budget spread over ~70 MCM — it's closer to €40M.
          </div>
          <div className="costcaveat">
            Derived from two sourced figures (Audit Office leak rate × WDD desalination cost). Assumes leaks hit
            desalinated and dam water in proportion to their share of the domestic network — illustrative, not an audited total.
          </div>
        </div>

        <h2>What the leak costs your household</h2>
        <p className="sub">
          Spread across the island's <strong>357,858 households</strong> (2021 census), that wasted desalinated water
          is the most expensive thing leaking out of the ground. The bill isn't itemised on anyone's invoice — but it
          is real money the state spends producing water that never arrives, and it falls unevenly: Nicosia's older
          pipes lose up to 40% against the 29% national average.
        </p>
        <div className="tiles">
          <div className="tile" style={{ borderLeftColor: "var(--c-water-deep)" }}>
            <div className="tv" style={{ color: "var(--c-water-deep)" }}>≈ €56–84</div>
            <div className="tl">per household per year nationwide — the production value of desalinated water lost to leaks before it reaches a tap (midpoint ~€70). On a full delivered-cost basis, closer to €110.</div>
          </div>
          <div className="tile" style={{ borderLeftColor: "var(--c-low)" }}>
            <div className="tv">≈ €95</div>
            <div className="tl">per Nicosia household per year — about 38% above the national average, because the capital's ageing network loses up to 40% versus 29% island-wide.</div>
          </div>
        </div>
        <p className="costcaveat" style={{ color: "var(--muted)" }}>
          Household figures = the leaked-water value above ÷ 357,858 households; the Nicosia split scales by its higher
          loss rate and is illustrative, since desalinated supply isn't published by district. It's the value of water
          lost, not a line a household is billed — and leaks hit dam water and desalinated water alike.
        </p>

        <h2>What it adds up to</h2>
        <p className="body">
          Strip away the year-to-year drama and the shape is clear. Cyprus's rainfall is volatile and trending drier;
          the dams smooth the swings but can no longer cover peak demand; and the gap is increasingly filled by water
          the island manufactures from the sea — at many times the cost of rain, with close to a fifth of the
          desalination budget leaking away before it arrives. The 2026 rebound is real, but it is weather, not a fix.
        </p>
        <p className="body" style={{ marginTop: 16 }}>
          Fixing those leaks is the cheapest water Cyprus could find — every cubic metre saved is one it doesn't have to
          desalinate — and the state has begun to spend on it. The 2026 water budget runs to €196M, the largest ever:
          mostly desalination production, but with money ring-fenced to cut network losses. A separate €8M was approved
          in 2025 for local authorities to upgrade pipes, and the EU-co-financed Thaleia programme (2021–27) adds around
          €230M for water resilience — including €7.5M to replace ageing pipelines in Limassol and €11M across the five
          district water bodies to chase down losses. The official target is to bring losses from roughly 40% down to 20%.
        </p>
        <div className="tiles">
          <div className="tile"><div className="tv">~5%</div><div className="tl">Netherlands — among the lowest leakage in Europe (Germany ~6%, Denmark ~8%), on newer mains and aggressive detection.</div></div>
          <div className="tile"><div className="tv">~25%</div><div className="tl">EU average for non-revenue water; the global average is closer to 30%.</div></div>
          <div className="tile" style={{ borderLeftColor: "var(--c-low)" }}><div className="tv" style={{ color: "var(--c-low)" }}>~29%</div><div className="tl">Cyprus nationwide — and up to 40% in Nicosia's older network, near the top of the EU range.</div></div>
          <div className="tile"><div className="tv">~42%</div><div className="tl">Italy — Europe's worst, after decades of under-investment (historically only ~€11 per person a year).</div></div>
        </div>
        <p className="body" style={{ marginTop: 18 }}>
          Cyprus is not unusual in facing this bill. The EU as a whole spends about €100bn a year on water supply and
          sanitation and, on OECD estimates, needs to lift that by more than a quarter — toward €290bn a year by 2030 —
          simply to keep ageing networks compliant; Cyprus already devotes an above-average share of its GDP to water.
          Others are paying to catch up: England and Wales, leaking about a fifth, have been cleared to spend over
          £700M on leakage reduction alone this regulatory cycle. The difference for Cyprus is leverage — because its
          marginal water is desalinated rather than rained-for, every point of leakage it removes is worth far more than
          the same repair in a wetter country. Which is why the leak, not the drought, may be the cheapest problem to fix.
        </p>

        <div className="foot">
          <p><strong>Sources.</strong> Reservoir data: Cyprus Water Development Department, via <a href="https://fragmata.info" target="_blank" rel="noreferrer">fragmata.info</a> (open data, Vladimir Bugay); bi-monthly storage Jan 1988 → Jun 2026. Tourism, halloumi exports, GDP and fiscal figures: CYSTAT (some via Cyprus Mail reporting). Household counts (357,858; avg 2.57 persons) and district shares: CYSTAT 2021 Census of Population and Housing (government-controlled areas). Per-capita consumption (up to ~500 L/day in places against a ~120 L European average): Smart Water Magazine, Feb 2026. Produce prices (2024): Cyprus Mail and the agriculture ministry's e-kofini platform. Agriculture support: Cyprus Ministry of Agriculture and European Commission. Desalination costs and leakage: Water Development Department and the 2025 Audit Office report, via Cyprus Mail. Fix-cost commitments (€196M 2026 budget; €8M leak-reduction tranche; €230M Thaleia 2021–27 programme): Cyprus government, via Politis and Cyprus Mail. Comparative water-sector spending and investment needs: OECD / European Commission (2020) and Water Europe (2024); national leakage rates: EEA and peer-reviewed compilations; England & Wales leakage allowance: Ofwat PR24 (2024). Restriction periods are hand-compiled from press and policy reporting and are indicative, not an official register. The leakage-cost and per-household figures are derived, not official (see calculations above).</p>
          <p style={{ marginTop: 10 }}>Snapshot frozen {s.snapshotDate}. Figures are storage as a share of each reservoir's capacity (MCM = million cubic metres).</p>
          <p className="foot-byline">
            By{" "}
            <a href="https://medium.com/@thomascgeorgiou" target="_blank" rel="noreferrer">Thomas Georgiou</a>
            {" · "}
            <a href="https://medium.com/@thomascgeorgiou" target="_blank" rel="noreferrer">Medium</a>
            {" · "}
            <a href="https://www.linkedin.com/in/thomascgeorgiou/" target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </div>
      </div>
    </div>
  );
}
