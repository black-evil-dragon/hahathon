#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <map>
#include <algorithm>

using namespace std;

// Функция для разбора адреса и получения координат
pair<int, int> parse_address(const string& address) {
    int space_index = address.find(' ');
    string street = address.substr(0, space_index);
    int number = stoi(address.substr(space_index + 1));

    int x, y;
    if (street[0] == 'V') {
        x = stoi(street.substr(1));
        y = (number % 4 <= 2) ? (number / 4) + 1 : (number / 4) + 2;
    } else if (street[0] == 'H') {
        y = stoi(street.substr(1));
        x = (number % 4 <= 2) ? (number / 4) + 1 : (number / 4) + 2;
    }
    return {x, y};
}

// Функция для вычисления расстояния (не используется в данной версии)
int calculate_distance(pair<int, int> coord1, pair<int, int> coord2) {
    return abs(coord1.first - coord2.first) * 100 + abs(coord1.second - coord2.second) * 100;
}

// Функция для сортировки точек по часовой стрелке
vector<pair<int, int>> sort_points_clockwise(vector<pair<int, int>>& points) {
    double center_x = 0, center_y = 0;
    for (const auto& point : points) {
        center_x += point.first;
        center_y += point.second;
    }
    center_x /= points.size();
    center_y /= points.size();

    auto angle_from_center = [&](pair<int, int> point) {
        double dx = point.first - center_x;
        double dy = point.second - center_y;
        return atan2(dy, dx);
    };

    sort(points.begin(), points.end(), [&](const pair<int, int>& a, const pair<int, int>& b) {
        return angle_from_center(a) > angle_from_center(b);
    });
    
    return points;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    string start_address;
    cin.ignore();
    getline(cin, start_address);
    
    int k;
    cin >> k;
    cin.ignore();
    
    vector<string> order_addresses(k);
    for (int i = 0; i < k; ++i) {
        getline(cin, order_addresses[i]);
    }

    map<pair<int, int>, string> address_dict;
    
    pair<int, int> start_coord = parse_address(start_address);
    address_dict[start_coord] = start_address;

    vector<pair<int, int>> order_coords;
    for (const auto& addr : order_addresses) {
        pair<int, int> coord = parse_address(addr);
        order_coords.push_back(coord);
        address_dict[coord] = addr;
    }
    
    // Добавляем стартовые координаты в список для сортировки
    order_coords.push_back(start_coord);
    order_coords = sort_points_clockwise(order_coords);

    // Находим индекс стартовой координаты
    auto it = find(order_coords.begin(), order_coords.end(), start_coord);
    rotate(order_coords.begin(), it + 1, order_coords.end());

    // Вывод отсортированных адресов
    for (const auto& coord : order_coords) {
        if (coord != start_coord) {  // Пропускаем стартовый адрес
            cout << address_dict[coord] << endl;
        }
    }

    return 0;
}