#include <iostream>
#include <string>
#include <vector>
#include <cmath>

using namespace std;

pair<int, int> parse_address(const string& address) {
    size_t space_pos = address.find(' ');
    string street = address.substr(0, space_pos);
    int number = stoi(address.substr(space_pos + 1));

    int x, y;
    if (street[0] == 'V') {
        x = stoi(street.substr(1)); // Номер вертикальной улицы -> X-координата
        if (number % 4 == 0 || number % 4 == 1 || number % 4 == 2) {
            y = (number / 4) + 1;
        } else {
            y = (number / 4) + 2;
        }
    } else if (street[0] == 'H') {
        y = stoi(street.substr(1)); // Номер горизонтальной улицы -> Y-координата
        if (number % 4 == 0 || number % 4 == 1 || number % 4 == 2) {
            x = (number / 4) + 1;
        } else {
            x = (number / 4) + 2;
        }
    }
    return {x, y};
}

int calculate_distance(const pair<int, int>& coord1, const pair<int, int>& coord2) {
    return abs(coord1.first - coord2.first) * 100 + abs(coord1.second - coord2.second) * 100;
}

int main() {
    int n, m;
    cin >> n >> m;
    cin.ignore(); // Игнорируем оставшийся символ новой строки после ввода

    string start_address;
    getline(cin, start_address);

    int k;
    cin >> k;
    cin.ignore(); // Игнорируем оставшийся символ новой строки после ввода

    vector<string> order_addresses(k);
    for (int i = 0; i < k; ++i) {
        getline(cin, order_addresses[i]);
    }

    pair<int, int> start_coord = parse_address(start_address);
    vector<pair<int, int>> order_coords;
    for (const string& addr : order_addresses) {
        order_coords.push_back(parse_address(addr));
    }

    int total_distance = 0;
    pair<int, int> current_coord = start_coord;

    for (const auto& coord : order_coords) {
        total_distance += calculate_distance(current_coord, coord);
        current_coord = coord;
    }

    total_distance += calculate_distance(current_coord, start_coord);

    cout << total_distance << endl;

    return 0;
}
