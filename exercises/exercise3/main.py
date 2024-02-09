# Given parameters
f0 = 125  # Hz
T = 0.0005  # s
N = 128

# Solve for k
k_values = [n * N // (f0 * T * 128) for n in range(N)]

print(k_values)
