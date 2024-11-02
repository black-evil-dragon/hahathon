import math

def parse_address(address):
    street, number = address.split()
    number = int(number)
    if street[0] == 'V':
        x = int(street[1:])
        if (number % 4) in [0, 1, 2]:
            y = (number // 4) + 1
        else:
            y = (number // 4) + 2
    elif street[0] == 'H':
        y = int(street[1:])
        if (number % 4) in [0, 1, 2]:
            x = (number // 4) + 1
        else:
            x = (number // 4) + 2
    return x, y

def calculate_distance(coord1, coord2):
    return abs(coord1[0] - coord2[0]) * 100 + abs(coord1[1] - coord2[1]) * 100

def sort_points_clockwise(points):
    # Находим центр тяжести всех точек
    center_x = sum(point[0] for point in points) / len(points)
    center_y = sum(point[1] for point in points) / len(points)

    # Вычисляем угол каждой точки относительно центра и сортируем
    def angle_from_center(point):
        dx = point[0] - center_x
        dy = point[1] - center_y
        return math.atan2(dy, dx)

    # Сортировка точек по углу (по часовой стрелке)
    points_sorted = sorted(points, key=angle_from_center, reverse=True)
    return points_sorted

# Входные данные
n, m = map(int, input().split())
start_address = input()
k = int(input())
order_addresses = [input() for _ in range(k)]

# Словарь для хранения соответствия координат и адресов
address_dict = {}

# Преобразуем все адреса в координаты и сохраняем в словаре
start_coord = parse_address(start_address)
address_dict[start_coord] = start_address

order_coords = []
for addr in order_addresses:
    coord = parse_address(addr)
    order_coords.append(coord)
    address_dict[coord] = addr

order_coords.append(start_coord)
order_coords = sort_points_clockwise(order_coords)
index = order_coords.index(start_coord)
order_coords = order_coords[index+1:] + order_coords[:index]

# Восстанавливаем адреса из отсортированных координат
sorted_addresses = [address_dict[coord] for coord in order_coords]

# Вывод отсортированных адресов
for addr in sorted_addresses:
    print(addr)