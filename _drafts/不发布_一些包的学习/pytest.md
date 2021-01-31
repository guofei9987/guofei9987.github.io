```
pytest will run all files of the form test_*.py or *_test.py in the current directory and its subdirectories.
```



- Project level, which runs all tests.
```
pytest statsmodels
```
- Folder level, which runs all tests below a folder
```
pytest statsmodels/regression/tests
```
- File level, which runs all tests in a file
```
pytest statsmodels/regression/tests/test_regression.py
```
- Class level, which runs all tests in a class
```
pytest statsmodels/regression/tests/test_regression.py::TestOLS
```
- Test level, which runs a single test. The first example runs a test in a class. The second runs a stand alone test.
```
pytest statsmodels/regression/tests/test_regression.py::TestOLS::test_missing
pytest statsmodels/regression/tests/test_regression.py::test_ridge
```
