const { queryMapData, queryDataByDate } = require("./confirmedCases.model");

const getVisualizationData = async (req, res, next) => {
  try {
    const data = [
      Object.assign(...(await queryMapData()), {
        colorscale: "hot",
        radius: 5,
        type: "densitymapbox",
        zmax: 5,
        zmin: 0,
      }),
    ];

    const dataByDate = await queryDataByDate();

    const frames = dataByDate.map((day) => {
      return {
        name: day.date,
        data: [
          {
            lat: day.lat,
            lon: day.lon,
            radius: 10,
            type: "denisitymapbox",
            z: day.z,
          },
        ],
      };
    });

    const steps = dataByDate.map((day) => {
      return {
        args: [
          day,
          {
            frame: {
              duration: 300,
              redraw: false,
            },
            transition: {
              duration: 1,
              ease: "quadratic-in-out",
            },
          },
        ],
        label: day,
        method: "animate",
        value: day,
      };
    });

    const layout = {
      updatemenus: [
        {
          buttons: [
            {
              args: [
                null,
                {
                  fromcurrent: true,
                  transition: {
                    duration: 1,
                    easing: "quadratic-in-out",
                  },
                },
              ],
              label: "Play",
              method: "animate",
            },
            {
              args: [
                [null],
                {
                  frame: {
                    duration: 0,
                    redraw: false,
                  },
                  mode: "immediate",
                  transition: {
                    duration: 0,
                  },
                },
              ],
              label: "Pause",
              method: "animate",
            },
          ],
          showactive: true,
          type: "buttons",
        },
      ],
      mapbox: {
        accesstoken: process.env.CONFIRMED_CASES_MAPBOX_TOKEN,
        style: process.env.CONFIRMED_CASES_MAPBOX_STYLE,
        center: {
          lat: 38,
          lon: -100,
        },
        zoom: 3.5,
      },
      title: "USA Covid-19 Confirmed Cases Daily Count",
      sliders: [
        {
          active: 0,
          currentvalue: {
            font: {
              size: 15,
            },
            prefix: "Date ",
            visible: true,
          },
          transition: {
            duration: 300,
            easing: "cubic-in-out",
          },
          x: 0,
          steps,
        },
      ],
    };

    res.status(200).json({ data, frames, layout });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVisualizationData };
