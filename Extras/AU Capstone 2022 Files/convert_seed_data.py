
f = open('C:/Users/antho/Documents/Fall2022-Spring2023/SoftwareEngineering/AU Capstone 2022 Files/PTOUserSeedData.json', 'r')
w = open('C:/Users/antho/Documents/Fall2022-Spring2023/SoftwareEngineering/AU Capstone 2022 Files/convertedseeddata.sql', 'w')
s = []
count = 0
pplcount = 0
try:
    while(True):
        pplcount += 1
        stra = '('
        while(True):
            count += 1
            line = f.readline()
            if (line.__contains__('},')):
                stra = stra[:-2] + '),\n'
                break
            elif line.__contains__(']') == False and line.__contains__('[') == False and line.__contains__('{') == False and line.__contains__('}') == False and line.__contains__('Vacation') == False and line.__contains__('Personal') == False and line.__contains__('Sick') == False:
                s = line.split(': ')
                stra += s[1].strip() + ' '
        w.write(stra)
        
except IndexError:
    print('error: ', s)
    print('total lines: ', count)
    print('people count: ', pplcount)

f.close()
w.close()

print('done')


