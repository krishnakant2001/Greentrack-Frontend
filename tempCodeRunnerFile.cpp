
#include <iostream>
using namespace std;

int main() {
    int arr[22] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 2100, 3849, 23342, 23343, 23344, 23345, 23346, 23347, 23348, 23349, 23350};

    int element = 23347;

    bool found = false;

    while(!found) {
        int firstIdx = 0;
        int lastIdx = 2;

        while(firstIdx <= lastIdx) {
            if(arr[lastIdx] >= element) {
                found = true;

                int midIdx = (firstIdx + lastIdx) / 2;

                if(arr[midIdx] == element) {
                    cout << midIdx << endl;
                    break;
                } else if(arr[midIdx] < element) {
                    firstIdx = midIdx + 1;
                } else {
                    lastIdx = midIdx - 1;
                }
            }
            else { 
                firstIdx = lastIdx + 1; 
                lastIdx = lastIdx * 2; 
            }
        }

    }

    return -1;
    
}