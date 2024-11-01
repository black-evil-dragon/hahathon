def parse_address(address):
    # Разбор адреса, определение типа улицы и номера дома
    street, number = address.split()
    number = int(number)

    # Определение координат перекрёстка в зависимости от типа улицы
    if street[0] == 'V':
        x = int(street[1:])  # Номер вертикальной улицы -> X-координата
        if (number % 4) in [0, 1, 2]:
            y = (number // 4) + 1  # Номер дома -> Y-координата
        else: y = (number // 4) + 2
    elif street[0] == 'H':
        y = int(street[1:])  # Номер горизонтальной улицы -> Y-координата
        if (number % 4) in [0, 1, 2]:
            x = (number // 4) + 1  # Номер дома -> X-координата
        else: x = (number // 4) + 2
    return x, y

def calculate_distance(coord1, coord2):
    # Расчет манхэттенского расстояния между двумя перекрёстками
    return abs(coord1[0] - coord2[0]) * 100 + abs(coord1[1] - coord2[1]) * 100


# Входные данные
n, m = map(int, input().split())
start_address = input()
k = int(input())
order_addresses = [input() for _ in range(k)]

# Координата начальной точки (фирмы)
start_coord = parse_address(start_address)

# Список координат заказчиков
order_coords = [parse_address(addr) for addr in order_addresses]

# Подсчет общего пробега
total_distance = 0
current_coord = start_coord

for coord in order_coords:
    total_distance += calculate_distance(current_coord, coord)
    current_coord = coord

# Возвращаемся в начальную точку
total_distance += calculate_distance(current_coord, start_coord)

print(total_distance)