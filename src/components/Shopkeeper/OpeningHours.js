import React from 'react';

const OpeningHours = ({ shop }) => {
  const date = new Date();

  const openingHours = hour => {
    let h = '';

    if (hour === 0) {
      return h;
    }

    hour = (hour < 10 ? '0' + hour : hour).toString();
    if (hour.includes('.')) {
      h = hour.replace('.', 'h');
      if (h.length === 4) {
        h = h + '0';
      }
    } else {
      h = hour + 'h00';
    }
    return h;
  };

  return (
    <table className="mb-3 text-small">
      <tbody>
        <tr className={date.getDay() === 1 ? 'font-weight-bold' : null}>
          <td className="">Lundi</td>
          {shop.opening_hours.monday.morning_open !== 0 &&
          shop.opening_hours.monday.afternoon_open !== 0 ? (
            <>
              <td className="text-right text-small">
                {openingHours(shop.opening_hours.monday.morning_open)}
                {openingHours(shop.opening_hours.monday.morning_close) !== 0 && (
                  <> / {openingHours(shop.opening_hours.monday.morning_close)}</>
                )}
                {' - '}
              </td>
              <td className="text-left text-small">
                {openingHours(shop.opening_hours.monday.afternoon_open) !== 0 && (
                  <>{openingHours(shop.opening_hours.monday.afternoon_open)} / </>
                )}
                {openingHours(shop.opening_hours.monday.afternoon_close)}
              </td>
            </>
          ) : (
            <td className="text-right text-small">Fermé</td>
          )}
        </tr>
        <tr className={date.getDay() === 2 ? 'font-weight-bold' : null}>
          <td>Mardi</td>
          {shop.opening_hours.tuesday.morning_open !== 0 &&
          shop.opening_hours.tuesday.afternoon_open !== 0 ? (
            <>
              <td className="text-right text-small">
                {openingHours(shop.opening_hours.tuesday.morning_open)}{' '}
                {openingHours(shop.opening_hours.tuesday.morning_close) !== 0 && (
                  <span> / {openingHours(shop.opening_hours.tuesday.morning_close)}</span>
                )}
                {' - '}
              </td>
              <td className="text-left text-small">
                {openingHours(shop.opening_hours.tuesday.afternoon_open) !== 0 && (
                  <span>{openingHours(shop.opening_hours.tuesday.afternoon_open)} / </span>
                )}
                {openingHours(shop.opening_hours.tuesday.afternoon_close)}
              </td>
            </>
          ) : (
            <td className="text-right text-small">Fermé</td>
          )}
        </tr>
        <tr className={date.getDay() === 3 ? 'font-weight-bold' : null}>
          <td>Mercredi</td>
          {shop.opening_hours.wednesday.morning_open !== 0 &&
          shop.opening_hours.wednesday.afternoon_open !== 0 ? (
            <>
              <td className="text-right text-small">
                {openingHours(shop.opening_hours.wednesday.morning_open)}
                {openingHours(shop.opening_hours.wednesday.morning_close) !== 0 && (
                  <span> / {openingHours(shop.opening_hours.wednesday.morning_close)}</span>
                )}
                {' - '}
              </td>
              <td className="text-left text-small">
                {openingHours(shop.opening_hours.wednesday.afternoon_open) !== 0 && (
                  <span>{openingHours(shop.opening_hours.wednesday.afternoon_open)} / </span>
                )}
                {openingHours(shop.opening_hours.wednesday.afternoon_close)}
              </td>
            </>
          ) : (
            <td className="text-right text-small">Fermé</td>
          )}
        </tr>
        <tr className={date.getDay() === 4 ? 'font-weight-bold' : null}>
          <td>Jeudi</td>
          {shop.opening_hours.thursday.morning_open !== 0 &&
          shop.opening_hours.thursday.afternoon_open !== 0 ? (
            <>
              <td className="text-right text-small">
                {openingHours(shop.opening_hours.thursday.morning_open)}
                {openingHours(shop.opening_hours.thursday.morning_close) !== 0 && (
                  <span> / {openingHours(shop.opening_hours.thursday.morning_close)}</span>
                )}
                {' - '}
              </td>
              <td className="text-left text-small">
                {openingHours(shop.opening_hours.thursday.afternoon_open) !== 0 && (
                  <span>{openingHours(shop.opening_hours.thursday.afternoon_open)} / </span>
                )}
                {openingHours(shop.opening_hours.thursday.afternoon_close)}
              </td>
            </>
          ) : (
            <td className="text-right text-small">Fermé</td>
          )}
        </tr>
        <tr className={date.getDay() === 5 ? 'font-weight-bold' : null}>
          <td>Vendredi</td>
          {shop.opening_hours.friday.morning_open !== 0 &&
          shop.opening_hours.friday.afternoon_open !== 0 ? (
            <>
              <td className="text-right text-small">
                {openingHours(shop.opening_hours.friday.morning_open)}
                {openingHours(shop.opening_hours.friday.morning_close) !== 0 && (
                  <span> / {openingHours(shop.opening_hours.friday.morning_close)}</span>
                )}
                {' - '}
              </td>
              <td className="text-left text-small">
                {openingHours(shop.opening_hours.friday.afternoon_open) !== 0 && (
                  <span>{openingHours(shop.opening_hours.friday.afternoon_open)} / </span>
                )}
                {openingHours(shop.opening_hours.friday.afternoon_close)}
              </td>
            </>
          ) : (
            <td className="text-right text-small">Fermé</td>
          )}
        </tr>
        <tr className={date.getDay() === 6 ? 'font-weight-bold' : null}>
          <td>Samedi</td>
          {shop.opening_hours.saturday.morning_open !== 0 &&
          shop.opening_hours.saturday.afternoon_open !== 0 ? (
            <>
              <td className="text-right text-small">
                {openingHours(shop.opening_hours.saturday.morning_open)}
                {openingHours(shop.opening_hours.saturday.morning_close) !== 0 && (
                  <span> / {openingHours(shop.opening_hours.saturday.morning_close)}</span>
                )}
                {' - '}
              </td>
              <td className="text-left text-small">
                {openingHours(shop.opening_hours.saturday.afternoon_open) !== 0 && (
                  <span>{openingHours(shop.opening_hours.saturday.afternoon_open)} / </span>
                )}
                {openingHours(shop.opening_hours.saturday.afternoon_close)}
              </td>
            </>
          ) : (
            <td className="text-right text-small">Fermé</td>
          )}
        </tr>
        <tr className={date.getDay() === 7 ? 'font-weight-bold' : null}>
          <td>Dimanche</td>
          {shop.opening_hours.sunday.morning_open !== 0 &&
          shop.opening_hours.sunday.afternoon_open !== 0 ? (
            <>
              <td className="text-right text-small">
                {openingHours(shop.opening_hours.sunday.morning_open)}
                {openingHours(shop.opening_hours.sunday.morning_close) !== 0 && (
                  <span> / {openingHours(shop.opening_hours.sunday.morning_close)}</span>
                )}
                {' - '}
              </td>
              <td className="text-left text-small">
                {openingHours(shop.opening_hours.sunday.afternoon_open) !== 0 && (
                  <span>{openingHours(shop.opening_hours.sunday.afternoon_open)} / </span>
                )}
                {openingHours(shop.opening_hours.sunday.afternoon_close)}
              </td>
            </>
          ) : (
            <td className="text-right text-small">Fermé</td>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default OpeningHours;
