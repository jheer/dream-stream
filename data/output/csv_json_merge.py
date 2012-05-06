import sys

def csv2py(json_file,timings_csv,turk_csv,destination):
    import csv
    import json

    #read json file
    reader = open(json_file,'r')

    rows = []
    text = ''
    for row in reader:
        text = text + row
        rows.append(row)
                
    #keys = index, query,image[array] 
    orig = json.loads(text)

    #read timings csv
    reader = csv.reader(open(timings_csv, 'r'))    
    headers = reader.next() 

    text = ''

    #headers: 0: index, 1: sentence,, 2: start, 3: end
    for row in reader:
        text = text + str(row)
        #print orig[int(row[0])]['index']

        orig[int(row[0])]['index'] = int(row[0])+1 
        orig[int(row[0])]['start'] = row[2]        
        orig[int(row[0])]['end'] = row[3]        

    #read turk images csv
    reader = csv.reader(open(turk_csv, 'r'))    
    headers = reader.next() 

    text = ''

    #0:segment, 1:lines, 2: images
    for row in reader:
        text = text + str(row)
        
        if 'turk_images' not in orig[int(row[0])]:
            orig[int(row[0])]['turk_images'] = []        
        
        orig[int(row[0])]['turk_images'].append(row[2])
   
    #print json.dumps(orig)
    f = open (destination, 'w')
    f.write(json.dumps(orig))
    f.close()
     

def main(*args):
    if (len(args)==5):
        orig_json_file = args[1]
	timings_csv = args[2]
	turk_csv  = args[3]
	dest = args[4]
        csv2py(orig_json_file, timings_csv, turk_csv, dest)

    else: 
        print "args given: "+str(len(args)) 
        print "args are json file, timings csv, turk csv, destination file"

 
if __name__ == '__main__':
    sys.exit(main(*sys.argv))
