### Problem 1: Can Rebook Flight

Oh no! You're flight has been cancelled and you need to rebook. Given an adjacency matrix of today's flights `flights` where each flight is labeled `0` to `n-1` and `flights[i][j] = 1` indicates that there is an available flight from location `i` to location `j`, return `True` if there exists a path from your current location `source` to your final destination `dest`. Otherwise return `False`.

Evaluate the time complexity of your function. Define your variables and provide a rationale for why you believe your solution has the stated time complexity.
```python
    def can_rebook(flights, source, dest):
        pass
```

Example Usage:
```python
    flights1 = [
        [0, 1, 0], # Flight 0
        [0, 0, 1], # Flight 1
        [0, 0, 0]  # Flight 2
    ]
    
    flights2 = [
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
    
    print(can_rebook(flights1, 0, 2))
    print(can_rebook(flights2, 0, 2)) 
```  

Example Output:
```python
    True
    False
```