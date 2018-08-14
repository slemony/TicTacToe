import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'db.sqlite'


def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'name': row[1],
        'winRecord': row[2],
    }

    return row_dict


app = Flask(__name__)


@app.route('/api/players', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM players ORDER BY name')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/players/<int:player>', methods=['GET'])
def show(player):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM players WHERE id=?', (str(player),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/players', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_player = (
        request.json['name'],
        request.json['winRecord'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO players(name,winRecord)
        VALUES(?,?,?)
    ''', new_player)

    player_id = cursor.lastrowid

    db.commit()

    response = {
        'id': player_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/players/<int:player>', methods=['PUT'])
def update(player):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != player:
        abort(400)

    update_player = (
        request.json['name'],
        request.json['winRecord'],
        str(player),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE players SET
            name=?,winRecord=?
        WHERE id=?
    ''', update_player)

    db.commit()

    response = {
        'id': player,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/players/<int:player>', methods=['DELETE'])
def delete(player):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != player:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM players WHERE id=?', (str(player),))

    db.commit()

    response = {
        'id': player,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
