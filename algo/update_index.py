html = open('index.html', 'r', encoding='utf-8').read()
start_idx = html.find('<!-- Syllabus Data Scripts -->')
end_idx = html.find('<!-- Script to aggregate data (ignoring missing files for now) -->')

scripts = '<!-- Syllabus Data Scripts -->\n'
scripts += '    <!-- Membaca -->\n'
for i in range(1, 11):
    scripts += f'    <script src="./data/membaca-{i}.js"></script>\n'

scripts += '    <!-- Math -->\n'
for i in range(1, 26):
    scripts += f'    <script src="./data/math-{i}.js"></script>\n'

scripts += '    <!-- English -->\n'
for i in range(1, 26):
    scripts += f'    <script src="./data/english-{i}.js"></script>\n'

scripts += '\n    '

new_html = html[:start_idx] + scripts + html[end_idx:]
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
print("Updated index.html successfully")
