CREATE FUNCTION calculate_show_duration(show_id INTEGER) RETURNS INTEGER AS $$
    SELECT COALESCE(SUM("durationSeconds"), 0)
    FROM (
      SELECT ri."durationSeconds"
      FROM "rundowns" rd
      LEFT JOIN "rundown_items" ri ON ri."rundownId" = rd."id"
      WHERE rd."showId" = show_id
      UNION ALL
      SELECT ci."durationSeconds"
      FROM "continuity_items" ci
      WHERE ci."showId" = show_id
    ) x;
$$ LANGUAGE SQL;

CREATE VIEW "shows_with_duration" AS SELECT *, calculate_show_duration(id) AS "durationSeconds", "start" + (calculate_show_duration(id) * '1 second'::interval) AS "end" FROM shows;
