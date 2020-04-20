const { queryMapData, queryDataByDate } = require("./confirmedCases.model");

const getVisualizationData = async (req, res, next) => {
  try {
    const data = [
      Object.assign(...(await queryMapData()), {
        colorscale: "Hot",
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
            type: "densitymapbox",
            z: day.z.map((s) => Number(s)),
          },
        ],
      };
    });

    const steps = dataByDate.map((day) => {
      return {
        args: [
          [day.date],
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
        label: day.date,
        method: "animate",
        value: day.date,
      };
    });

    const layout = {
      height: 800,
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
      title: {
        text: "USA Covid-19 Confirmed Cases Daily Count",
      },
      sliders: [
        {
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
          steps,
          x: 0,
          active: 0,
        },
      ],
    };

    res.status(200).json({ data, frames, layout });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVisualizationData };
