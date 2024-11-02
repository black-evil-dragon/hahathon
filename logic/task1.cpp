#include <iostream>
#include <string>

using namespace std;

int street_to_int(string street) {
    street.erase(0, 1);

    int number_of_street = 0;

    for (char c : street) {
        number_of_street *= 10;
        switch (c) {
        case '1': number_of_street += 1; break;
        case '2': number_of_street += 2; break;
        case '3': number_of_street += 3; break;
        case '4': number_of_street += 4; break;
        case '5': number_of_street += 5; break;
        case '6': number_of_street += 6; break;
        case '7': number_of_street += 7; break;
        case '8': number_of_street += 8; break;
        case '9': number_of_street += 9; break;
        default: break;
        }
    }

    return number_of_street - 1;
}

int probeg_za_zaezd(int& x1, int& y1, int& x2, int& y2, string street = "", int house = 0, bool end = false) {
    //1 - начальная позиция, 2 - конечная позиция
    int probeg = 0;

    if (!end) cin >> street >> house;

    //2
    if (street[0] == 'H') {
        x2 = street_to_int(street);
        y2 = (house + 1) / 4;
    }
    else if (street[0] == 'V') {
        x2 = (house + 1) / 4;
        y2 = street_to_int(street);
    }

    probeg = abs(x1 - x2) + abs(y1 - y2);

    //1
    x1 = x2;
    y1 = y2;
    if (end) {
        x2 = 0;
        y2 = 0;
    }
    return probeg * 100;
}

int main()
{
    const int x1 = 0, y1 = 1, x2 = 2, y2 = 3;
    int coords[4]{ 0 };
    int N, M;
    cin >> N >> M;

    string adress_street;
    int adress_nomer_doma;
    cin >> adress_street >> adress_nomer_doma;

    if (adress_street[0] == 'H') {
        coords[x1] = street_to_int(adress_street);
        coords[y1] = (adress_nomer_doma + 1) / 4;
    }
    else if (adress_street[0] == 'V') {
        coords[x1] = (adress_nomer_doma + 1) / 4;
        coords[y1] = street_to_int(adress_street);
    }
    else return 0;

    int kol_vo_zakazov;
    cin >> kol_vo_zakazov;

    int probeg = 0;

    for (int i = 0; i < kol_vo_zakazov; ++i) {
        probeg += probeg_za_zaezd(coords[x1], coords[y1], coords[x2], coords[y2]);
    }
    probeg += probeg_za_zaezd(coords[x1], coords[y1], coords[x2], coords[y2], adress_street, adress_nomer_doma, false);

    cout << probeg << endl;
}